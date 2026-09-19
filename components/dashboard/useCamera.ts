"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type CameraStatus =
  | "idle"
  | "requesting"
  | "live"
  | "denied"
  | "notfound"
  | "busy"
  | "insecure"
  | "unsupported"
  | "ended"
  | "error";

export type CameraDevice = { id: string; label: string };

const DEVICE_KEY = "classpulse:camera-device";

function readStoredDevice(): string | undefined {
  try {
    return localStorage.getItem(DEVICE_KEY) ?? undefined;
  } catch {
    return undefined;
  }
}

function storeDevice(id: string) {
  try {
    localStorage.setItem(DEVICE_KEY, id);
  } catch {
    // Хувийн цонх гэх мэтэд localStorage ажиллахгүй байж болно — чухал биш.
  }
}

function statusFromError(error: unknown): CameraStatus {
  const name = error instanceof DOMException ? error.name : "";
  switch (name) {
    case "NotAllowedError":
    case "SecurityError":
      return "denied";
    case "NotFoundError":
    case "OverconstrainedError":
      return "notfound";
    case "NotReadableError":
    case "AbortError":
      return "busy";
    default:
      return "error";
  }
}

function constraints(deviceId?: string): MediaStreamConstraints {
  return {
    audio: false,
    video: {
      ...(deviceId ? { deviceId: { exact: deviceId } } : {}),
      width: { ideal: 1280 },
      height: { ideal: 720 },
    },
  };
}

/**
 * Хөтчийн камерт хандаж, шууд дүрсийг `videoRef`-д холбоно.
 * Дүрс зөвхөн энэ хөтөч дотор харагдах бөгөөд хаашаа ч илгээгдэхгүй.
 */
export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  // Зэрэг ирсэн хүсэлтүүдээс зөвхөн хамгийн сүүлийнх нь хүчинтэй — бусад stream-ийг шууд зогсооно.
  const requestRef = useRef(0);

  const [status, setStatus] = useState<CameraStatus>("idle");
  const [devices, setDevices] = useState<CameraDevice[]>([]);
  const [deviceId, setDeviceId] = useState("");
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);

  const release = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  const refreshDevices = useCallback(async () => {
    const all = await navigator.mediaDevices.enumerateDevices();
    setDevices(
      all
        .filter((device) => device.kind === "videoinput")
        .map((device, index) => ({ id: device.deviceId, label: device.label || `Камер ${index + 1}` })),
    );
  }, []);

  const start = useCallback(
    async (preferredId?: string) => {
      if (!window.isSecureContext) return setStatus("insecure");
      if (!navigator.mediaDevices?.getUserMedia) return setStatus("unsupported");

      const request = ++requestRef.current;
      release();
      setSize(null);
      setStatus("requesting");

      const wanted = preferredId ?? readStoredDevice();
      try {
        let stream: MediaStream;
        try {
          stream = await navigator.mediaDevices.getUserMedia(constraints(wanted));
        } catch (error) {
          // Өмнө сонгосон камер салгагдсан бол аль ч камераар дахин оролдоно.
          if (!wanted || statusFromError(error) !== "notfound") throw error;
          stream = await navigator.mediaDevices.getUserMedia(constraints());
        }

        if (request !== requestRef.current) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;
        const [track] = stream.getVideoTracks();
        track.addEventListener("ended", () => {
          if (streamRef.current !== stream) return;
          release();
          setSize(null);
          setStatus("ended");
        });

        const id = track.getSettings().deviceId ?? "";
        setDeviceId(id);
        if (id) storeDevice(id);

        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          await video.play().catch(() => {});
        }
        setStatus("live");
        await refreshDevices();
      } catch (error) {
        if (request !== requestRef.current) return;
        release();
        setStatus(statusFromError(error));
      }
    },
    [refreshDevices, release],
  );

  /** Хүлээгдэж буй хүсэлтийг цуцалж, асаалттай камерыг унтраана. */
  const cancel = useCallback(() => {
    requestRef.current++;
    release();
  }, [release]);

  const stop = useCallback(() => {
    cancel();
    setSize(null);
    setStatus("idle");
  }, [cancel]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const update = () => {
      if (video.videoWidth && video.videoHeight) setSize({ width: video.videoWidth, height: video.videoHeight });
    };
    video.addEventListener("loadedmetadata", update);
    video.addEventListener("resize", update);
    return () => {
      video.removeEventListener("loadedmetadata", update);
      video.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    // Зөвшөөрөл өмнө нь олгогдсон бол камерыг шууд асаана.
    navigator.permissions
      ?.query({ name: "camera" as PermissionName })
      .then((permission) => {
        if (!cancelled && permission.state === "granted") void start();
      })
      .catch(() => {});

    const onDeviceChange = () => {
      if (streamRef.current) void refreshDevices();
    };
    navigator.mediaDevices?.addEventListener?.("devicechange", onDeviceChange);

    return () => {
      cancelled = true;
      navigator.mediaDevices?.removeEventListener?.("devicechange", onDeviceChange);
      cancel();
    };
  }, [cancel, refreshDevices, start]);

  return { videoRef, status, devices, deviceId, size, start, stop };
}

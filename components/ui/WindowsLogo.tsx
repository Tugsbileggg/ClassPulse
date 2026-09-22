/** Windows-ийн лого (дөрвөн дөрвөлжин). lucide-react-д брэндийн дүрс байхгүй тул энд зурав. */
export function WindowsLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M0 0h7.5v7.5H0zM8.5 0H16v7.5H8.5zM0 8.5h7.5V16H0zM8.5 8.5H16V16H8.5z" />
    </svg>
  );
}

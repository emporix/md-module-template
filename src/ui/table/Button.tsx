interface ToggleButtonProps {
  isActive: boolean
  onClick: () => void
  className?: string
}

export const ToggleButton = ({
  isActive,
  onClick,
  className = ''
}: ToggleButtonProps) => (
  <button
    type='button'
    onClick={onClick}
    className={`relative inline-flex h-6 w-11 items-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isActive ? 'bg-blue-600' : 'bg-gray-200'} ${className}`}
    style={{ flexShrink: 0 }} // Prevents the button from shrinking
    aria-pressed={isActive}>
    <span
      className={`inline-block h-4 w-4 transform bg-white transition-transform ${isActive ? 'translate-x-6' : 'translate-x-1'}`}
    />
  </button>
)


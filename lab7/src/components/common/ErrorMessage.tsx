interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className="error-state">❌ {message}</div>
);
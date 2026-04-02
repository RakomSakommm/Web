interface ResultBoxProps {
  message: string | null;
  isError?: boolean;
}

export const ResultBox = ({ message, isError = false }: ResultBoxProps) => {
  if (!message) return null;
  return (
    <div className={`result-box ${isError ? 'error' : 'success'}`}>
      {message}
    </div>
  );
};
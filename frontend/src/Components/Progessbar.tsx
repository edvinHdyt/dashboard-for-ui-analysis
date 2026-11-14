interface TimerBarProps {
  durationMs?: number; // Durasi dalam milidetik, default 3000ms (3 detik)
}

export function TimerProgressBar({ durationMs = 2000 }: TimerBarProps) {
  return (
    <div className="w-full h-1 bg-slate-200 overflow-hidden rounded-b-md">
      <div
        className="h-full bg-teal-600 animate-[shrinkWidth_linear_forwards]"
        style={{ animationDuration: `${durationMs}ms` }}
      />
    </div>
  );
}

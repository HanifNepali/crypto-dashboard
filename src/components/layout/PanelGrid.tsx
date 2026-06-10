import { type ReactNode } from 'react';

interface PanelGridProps {
  primary: ReactNode;
  secondary: ReactNode;
}

export function PanelGrid({ primary, secondary }: PanelGridProps) {
  return (
    <div className="grid h-full grid-cols-4 gap-6 px-8 pb-8">
      <div className="col-span-4 xl:col-span-3 flex flex-col gap-6 overflow-y-auto pr-1">
        {primary}
      </div>
      <div className="col-span-4 xl:col-span-1 flex flex-col gap-6 overflow-y-auto pr-1">
        <div className="grid lg:grid-cols-2 gap-6 xl:flex flex-col">{secondary}</div>
      </div>
    </div>
  );
}

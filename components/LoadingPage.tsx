export const LoadingPage = () => {
  return (
    <div className="h-full flex flex-col w-full">
      <header className="px-8 py-6 bg-surface border-b border-border flex justify-between items-center h-[120px]">
        <div>
           <div className="h-8 w-48 bg-border/40 rounded animate-pulse"></div>
           <div className="mt-4 h-10 w-32 bg-border/40 rounded animate-pulse"></div>
        </div>
        <div className="flex flex-col justify-between h-full py-1">
           <div className="h-10 w-40 bg-border/40 rounded-lg self-end animate-pulse"></div>
           <div className="h-5 w-24 bg-border/40 rounded self-end animate-pulse"></div>
        </div>
      </header>
      
      <div className="p-8 flex-1 overflow-auto">
        <div className="bg-surface rounded-xl shadow-sm border border-border p-6 h-full flex flex-col">
           <div className="flex flex-col sm:flex-row gap-4 justify-between mb-8">
             <div className="h-11 w-full max-w-md bg-border/40 rounded-lg animate-pulse"></div>
             <div className="h-11 w-48 bg-border/40 rounded-lg animate-pulse"></div>
           </div>
           
           <div className="flex items-center justify-between mb-6 px-4">
             {[...Array(5)].map((_, i) => (
                <div key={`head-${i}`} className="h-4 w-24 bg-border/40 rounded animate-pulse"></div>
             ))}
           </div>
           
           <div className="space-y-6">
             {[...Array(6)].map((_, i) => (
               <div key={`row-${i}`} className="flex items-center justify-between px-4 py-4 border-b border-border/40 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-border/40 animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-border/40 rounded animate-pulse"></div>
                      <div className="h-3 w-20 bg-border/40 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="h-4 w-24 bg-border/40 rounded animate-pulse hidden sm:block"></div>
                  <div className="h-4 w-24 bg-border/40 rounded animate-pulse hidden sm:block"></div>
                  <div className="h-4 w-20 bg-border/40 rounded animate-pulse hidden sm:block"></div>
                  <div className="h-8 w-20 bg-border/40 rounded-full animate-pulse"></div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

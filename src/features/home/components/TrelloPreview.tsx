export function TrelloPreview() {
  return (
    <div className="relative h-64 md:h-80 w-full max-w-2xl mx-auto">
      <div className="absolute inset-0 flex items-center justify-center gap-4">
        {/* A fazer */}
        <div className="bg-white rounded-lg shadow-md p-4 w-48 h-64 flex flex-col">
          <div className="text-sm font-medium text-slate-700 mb-3">A fazer</div>
          <div className="bg-slate-100 rounded p-2 mb-2">
            <div className="text-xs text-slate-800">Planejar sprint</div>
          </div>
          <div className="bg-slate-100 rounded p-2 mb-2">
            <div className="text-xs text-slate-800">Revisar documentação</div>
          </div>
          <div className="bg-slate-100 rounded p-2">
            <div className="text-xs text-slate-800">Preparar apresentação</div>
          </div>
        </div>

        {/* Em progresso */}
        <div className="bg-white rounded-lg shadow-md p-4 w-48 h-64 flex flex-col">
          <div className="text-sm font-medium text-slate-700 mb-3">Em progresso</div>
          <div className="bg-sky-100 rounded p-2 mb-2">
            <div className="text-xs text-slate-800">Desenvolver API</div>
          </div>
          <div className="bg-sky-100 rounded p-2">
            <div className="text-xs text-slate-800">Criar componentes UI</div>
          </div>
        </div>

        {/* Concluído */}
        <div className="bg-white rounded-lg shadow-md p-4 w-48 h-64 flex flex-col">
          <div className="text-sm font-medium text-slate-700 mb-3">Concluído</div>
          <div className="bg-green-100 rounded p-2 mb-2">
            <div className="text-xs text-slate-800">Definir requisitos</div>
          </div>
          <div className="bg-green-100 rounded p-2">
            <div className="text-xs text-slate-800">Configurar ambiente</div>
          </div>
        </div>
      </div>
    </div>
  );
}

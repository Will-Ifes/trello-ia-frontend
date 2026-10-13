export function Footer() {
  return (
    <footer className="w-full py-6 px-6 border-t border-slate-100">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} Trello.ia. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

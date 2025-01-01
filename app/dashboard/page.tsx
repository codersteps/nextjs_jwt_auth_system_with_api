export default function Dashboard() {
  return (
    <main>
      <div className="container space-y-6 px-4">
        <h2 className="font-bold text-2xl">Authenticated Area</h2>

        <p>
          Anything under <em>/dashboard</em> is protected by the{' '}
          <strong>checkUnAuthenticated()</strong> in
          <code>app/dashboard/layout.tsx</code> page.
        </p>
      </div>
    </main>
  )
}

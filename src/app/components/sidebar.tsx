

interface routes {
  label: string,
  route: string,
}


export default function SideBar() {

  const dashRoutes: routes[] = [
    {
      label: "New Data Vault",
      route: "/post",
    },
    {
      label: "Data Vault",
      route: "/vault"
    }
  ]


  return (
    <div className="lg:w-80 min-h-screen left-0">
      {dashRoutes.map((route) => (
        <div key={route.route}>
          <a href={route.route}>
            <div className="flex item-center justify-between px-4 py-2 ">
              <div className="flex items-center gap-4">
                <div className="text-md  flex items-center ">
                  <h3>{route.label}</h3>
                </div>
              </div>
            </div>
          </a>
          <div className="h-2 bg-white" />
        </div>
      ))}
    </div>
  )
}

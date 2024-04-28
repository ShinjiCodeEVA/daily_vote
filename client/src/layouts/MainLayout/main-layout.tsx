import { MainLayoutProp } from "./main-layout.interface"
import { Navbar } from "../Navbar"
import { Footer } from "../Footer"

export const MainLayout = ({children}: MainLayoutProp) => {
    
  return (
    <main className="font-space-grotesk h-full py-2 px-3 sm:px-16 bg-black-400 flex items-center justify-center  min-w-[310px]">
        <div className="max-w-[1400px] w-full ">
          <section>
              <Navbar/>
          </section>

          <section>
              {children}
          </section>
          
          <section>
              <Footer/>
          </section>
        </div>
    </main>
  )
}

import Select from 'react-select'
import { colourOptions } from './data'

export function Intro() {
  return (
    <section
      className={`relative w-full flex-grow bg-cover bg-center bg-no-repeat h-full h-screen`}
      // style={{ backgroundImage: `url('https://images.pexels.com/photos/191429/pexels-photo-191429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')` }}>
      style={{ backgroundImage: `url('https://scontent-waw2-1.xx.fbcdn.net/v/t39.30808-6/481273625_948153284104618_7822160511335741123_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=nK_e4sX7GV8Q7kNvgFJq_c3&_nc_oc=AdiI-YLu_Pb4XurNAZCnOiiAbX15pkyb6pkfVajgUv8o2xnoZzfkKw0T_Oo-jJJOIs12ieWVsoO-aMA9_8O04LET&_nc_zt=23&_nc_ht=scontent-waw2-1.xx&_nc_gid=AVK6M0hNosFa0QqnOKDtRw9&oh=00_AYGFKgofw3GnvX3YJ2KeX923kNuFD8TKXyZyii5qcQulgQ&oe=67D5E25A')` }}>
      <div className="flex justify-center items-center p-8 mx-auto w-full h-full">
        <div className="flex flex-col gap-4 items-center">
          <h2 className="z-1 text-2xl font-extrabold text-center">
            Welcome, Joe Doe! Please select your school.
          </h2>
          <div>
            <Select
              className="w-150 z-1" // Doubled the width from default 100px
              classNamePrefix="select"
              defaultValue={colourOptions[0]}
              isDisabled={false}
              isLoading={false}
              isClearable={true}
              isRtl={false}
              isSearchable={true}
              name="color"
              options={colourOptions}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  height: '60px', // Increased height
                  fontSize: '1.2rem' // Increased font size
                })
              }}
            />
          </div>
        </div>
      </div>
      <div className="bg-amber-200/75 sm:bg-transparent sm:from-amber-200/85 sm:to-white ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l absolute inset-0 pointer-events-none"></div>
    </section>
  )
}

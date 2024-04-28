import { Poll } from "../components"
import { Head } from "../../../components/Elements/Head"
import { Icon } from "../../../components/Elements"
import { getActivePolls } from "../api/getActivePolls"
import { PollType } from "../../../common/types"

export const ActivePolls = () => {

  const {data} = getActivePolls();

  console.log(data)

  return (
    <div >
        <div className="flex items-center gap-2 mt-10">
            <Head
            className="font-bold text-xl text-green-400 "
            text="Active Votes">
            </Head>
            <Icon className="text-2xl">🔉</Icon>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-10 px-4 sm:px-0 sm:grid-cols-2 lg:grid-cols-3">
        { data && data.map((poll: PollType, index: number) => { 
            return <Poll
                    key={index}
                    active={true}
                    poll={poll}
                  />
          })  }
        </div>
    </div>
  )
}

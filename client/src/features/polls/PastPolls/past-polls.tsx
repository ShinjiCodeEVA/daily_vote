import { Head } from "../../../components/Elements/Head"
import { Icon } from "../../../components/Elements"
import { Poll } from "../components"
import { getExpiredPolls } from "../api/getExpiredPolls"
import { PollType } from "../../../common/types"

export const PastPolls = () => {

  const {data} = getExpiredPolls();

  console.log(data)

  return (
    <div>
        <div className="flex items-center gap-2 mt-16">
            <Head
            className="font-bold text-xl text-red-500 "
            text="Past Votes">
            </Head>
            <Icon className="text-2xl">🔉</Icon>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-10 px-4 sm:px-0 sm:grid-cols-2 lg:grid-cols-3">
          { data && data.map((poll: PollType, index: number) => { 
            return <Poll
                    active={false}
                    key={index}
                    poll={poll}
                  />
          })  }
        </div>
    </div>
  )
}

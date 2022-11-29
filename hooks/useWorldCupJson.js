import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useWorldCupJson(){
    const {data, error} = useSWR('https://worldcupjson.net/matches/?by_date=ASC', fetcher);

    if(error || data?.message){
        return [undefined, undefined, undefined, undefined, true]; 
    }

    const completedMatch = data?.filter(x => x.status === 'completed');
    const nextMatch = data?.filter(x => x.status === 'future_scheduled');
    const liveMatch = data?.filter(x => x.status === 'in_progress');
    const hasLiveMatch = liveMatch?.length == 1;
    const currentMatch = hasLiveMatch ? liveMatch.at(0) : completedMatch?.at(-1);

    return [currentMatch, nextMatch, completedMatch, hasLiveMatch, error];
}
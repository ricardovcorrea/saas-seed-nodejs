const SET_STATISTICS = 'STATISTICS_SET_STATISTICS';

export const setStatisticsAction = (statistics:any) => {
    return {
        type: SET_STATISTICS,
        payload: statistics
    }
}

const initialState = {
    totalMatches: 0,
    totalMatchesNow: 0,
    totalPlayers: 0,
    totalPlayersNow: 0,
    totalQuestions: 0,
    totalAnswered: 0,
    totalThemes : 0,
    recentPlayers: [],
    top10PlayersByWin: []
};

export default (previousState = initialState, { type, payload }:any) => {
    if (type === SET_STATISTICS) {
        return { ...previousState, ...payload };
    }
    return previousState;
}
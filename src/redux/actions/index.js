export const importTeams = (obj) => {
  return {
    type:"IMPORT_TEAMS",
    payload:{
      obj
    }
  }
}

export const addTeam = (name) => {
  return {
    type: "ADD_TEAM",
    payload: {
      teamName: name,
    },
  };
};

export const selectRosterTeam = (name) => {
  return {
    type: "SELECT_TEAM",
    payload: {
      teamName: name,
    },
  };
};

export const addPlayer = (obj) => {
  return {
    type: "ADD_PLAYER",
    payload: {
      teamId: obj.teamId,
      playerName: obj.playerName,
      playerNumber: obj.playerNumber,
    },
  };
};

export const editPlayerName = (
  teamName,
  playerId,
  updatedPlayerName,
  updatedPlayerNumber
) => {
  return {
    type: "EDIT_PLAYER",
    payload: {
      teamName,
      playerId,
      updatedPlayerName,
      updatedPlayerNumber,
    },
  };
};

export const deletePlayerName = (team, playerId) => {
  return {
    type: "DELETE_PLAYER",
    payload: {
      team,
      playerId,
    },
  };
};

export const showModal = (num) => {
  return {
    type: "SHOW_MODAL",
    payload: {
      number: num,
    },
  };
};

export const closeModal = (num) => {
  return {
    type: "CLOSE_MODAL",
    payload: {
      number: num,
    },
  };
};

export const recordTeams = (title, date, homeTeam, awayTeam, game_id) => {
  return {
    type: "record_Teams",
    payload: {
      title,
      date,
      homeTeam,
      awayTeam,
      game_id,
    },
  };
};

export const selectCurrentlyPlaying = (position) => {
  return {
    type: "select_currentlyPlaying",
    payload: {
      position,
    },
  };
};

export const inputCurrentlyPlaying = (player, position, number, team) => {
  return {
    type: "input_currentlyPlaying",
    payload: {
      position,
      player,
      number,
      team,
    },
  };
};

export const resetCurrentlyPlaying = () => {
  return {
    type: "reset_currentlyPlaying",
  };
};

export const inputStats = (player, team, quarter, stats, number) => {
  return {
    type: "input_stats",
    payload: {
      player,
      team,
      quarter,
      stats,
      number,
    },
  };
};

export const deleteStats = (index) => {
  return {
    type: "delete_stats",
    payload: {
      index,
    },
  };
};

export const toggleQuarter = () => {
  return {
    type: "toggle_quarter",
  };
};

export const toggleQuarterEnd = () => {
  return {
    type: "toggle_quarterEnd",
  };
};

export const toggleQuarterNew = () => {
  return {
    type: "toggle_quarterNew",
  };
};

export const togglePrevQuarter = () => {
  return {
    type: "toggle_prevQuarter",
  };
};

export const inputPostGameStatsHome = (
  player,
  number,
  points,
  two_points,
  two_points_attempt,
  two_points_per,
  three_points,
  three_points_attempt,
  three_points_per,
  foul_points,
  foul_points_attempt,
  foul_points_per,
  offensive_rebound,
  defensive_rebound,
  all_rebound,
  assists,
  steals,
  blocks,
  turnOver,
  foul
) => {
  return {
    type: "input_postGameStatsHome",
    payload: {
      player,
      number,
      points,
      two_points,
      two_points_attempt,
      two_points_per,
      three_points,
      three_points_attempt,
      three_points_per,
      foul_points,
      foul_points_attempt,
      foul_points_per,
      offensive_rebound,
      defensive_rebound,
      all_rebound,
      assists,
      steals,
      blocks,
      turnOver,
      foul,
    },
  };
};

export const inputPostGameStatsAway = (
  player,
  number,
  points,
  two_points,
  two_points_attempt,
  two_points_per,
  three_points,
  three_points_attempt,
  three_points_per,
  foul_points,
  foul_points_attempt,
  foul_points_per,
  offensive_rebound,
  defensive_rebound,
  all_rebound,
  assists,
  steals,
  blocks,
  turnOver,
  foul
) => {
  return {
    type: "input_postGameStatsAway",
    payload: {
      player,
      number,
      points,
      two_points,
      two_points_attempt,
      two_points_per,
      three_points,
      three_points_attempt,
      three_points_per,
      foul_points,
      foul_points_attempt,
      foul_points_per,
      offensive_rebound,
      defensive_rebound,
      all_rebound,
      assists,
      steals,
      blocks,
      turnOver,
      foul,
    },
  };
};

export const resetPostGameStats = () => {
  return {
    type: 'reset_postGameStats'
  }
}

export const recordScore = (homeScore, awayScore) => {
  return {
    type: 'record_score',
    payload:{
      homeScore,
      awayScore
    }
  }
}

export const login = (userName, password) => {
  return {
    type: 'login',
    payload: {
      userName,
      password
    }
  }
}

export const logout = () => {
  return {
    type: 'logout'
  }
}
# RGA - Record Game Analysis

RGA is a basketball player stats recording tool that's built entirely on the web. I was initially inspired by my friend who helps with weekend basketball league in Taiwan and found out they do all their stats recording on paper, and it's 2023. So I thought, let's change that.

### Built with
- React
- React-Bootstrap
- Redux

### Getting Started

- npm
```
npm install
```
### Usage

#### Getting Started - Adding team to the Roster
![adding new team](/9.png)
Navigate to *Roster* on the navbar at the top. User will be able to click the *New* button on the left column to add new team. 

![editing team](/8.png)
After adding team name, click on it to then click the *edit* button to edit team roster. 
By default there are no members added in new team, click the *add team* button at the bottom and input player name and number.
If user need to edit player name/number, user may click the *edit* button next to player name.
If user need to remove a player from the roster, simply click on the *delete* button.

![viewing team](/7.png)
User can view team rosters by clicking on team name on the left.

#### Starting a game
![home page section](/1.png)
Once user has added their team to the system, head back to home page.
Input the title for the game.
Choose home and away team.
Click *next* to start.

![record game section](/2.png)
This page is where user can do all the live-recording during the game. First, input all the starting line-up players. To do so, click the *Edit Floor Player* button toward the bottom-left side of the page. 
User can swap-out players at any time.

![recording player stats](/3.png)
To log player stats during the game:
1. Click on the player name. Player card color will change to yellow when selected.
2. While the player is selected, clicking on one of the 14 dark navy blue buttons in the center will log the stats accordingly to the player currently selected.

Stats log are displayed in at the bottom section in the order: Newest(top) to Oldest(bottom).
User can remove a stat log by clicking on the *del* button at the right of each log. 

![quarter panel](/4.png)
As the game progress, user can click on *next* at the top to let the system know which quarter the game is currently at. When logging player stats into system, it will also log the corresponding quarter. 
If user makes a mistake by clicking *next* too many times, there is also a *prev* button for going back to the previous quarter. 

![end game button](/5.png)
Clicking *next* at Q4 will take user to *End* button where user can click to navigate to **post-game stats section**.

#### Post Game Stats
![post game stats](/6.png)
Post Game Stats section will display all the recorded stats of players that have participated in the game.
The stats page is organized by Home and Away team. 
Date of game is shown at the top left.
Game ID is a unique ID generated for each game, shown at the top right.



### Roadmap
- [x] Show post game stats at the end
- [ ] Functional time-out/note button
- [ ] Add Game section where users can view pasts game stats
- [ ] Add Analysis section
- [ ] Traditional-Chinese
- [ ] Log for swapping players during the game

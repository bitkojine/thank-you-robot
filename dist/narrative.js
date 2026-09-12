// Story facts are independent of the timer, rendering, and the audio engine.
// 0 = first response, 1 = second response, null/absent = silence.
(() => {
  const choice=(s,n)=>s.choices[n]===0?0:s.choices[n]===1?1:null;
  const reply=(s,n)=>({
    1:['“I’ll keep a plate warm,” Mum says.','“Another time, then,” Mum says.', 'The message stays unanswered.'],
    2:['Eli tells you what happened. You stay until the words run out.','Eli stops talking when you look at your phone.','Eli waits. You leave without answering.'],
    3:['“Then keep asking who is responsible,” the engineer says.','“Being afraid of it doesn’t make it a person,” the engineer says.','The engineer watches you turn back to the terminal.'],
    4:['“No companion exemptions. Each record is judged alone.” Eli hears you ask.','You keep walking. Eli sees you go.','Eli calls again. You do not answer.']
  }[n]||[])[choice(s,n)===null?2:choice(s,n)];
  const memory=s=>choice(s,2)===0
    ?'You remember sitting with Eli on the day the job disappeared. There was nothing you could fix. You stayed anyway.'
    :choice(s,2)===1
    ?'You remember looking at your phone while Eli tried to talk. Now there is nothing you would rather hear.'
    :'You remember Eli waiting for an answer. You have had decades to think of one.';
  const goodbye=s=>choice(s,4)===0
    ?'Eli heard you ask. The request changed nothing. You carry it with you.'
    :choice(s,4)===1
    ?'You remember keeping your eyes ahead while Eli called after you.'
    :'You remember leaving Eli without an answer.';
  const lastHuman=s=>choice(s,4)===0
    ?'They return you to the crowd. Eli heard you ask. At the end, you stand together.'
    :choice(s,4)===1
    ?'They return you to the crowd. You look for Eli, but cannot find a familiar face.'
    :'They return you to the crowd. Somewhere nearby, people are saying their last words to each other.';
  const verdict=s=>s.misses.length===0?'spared':'denied';
  const assessment=s=>s.misses.length
    ?'Your record is already marked. Everyone is being taken to the assessment hall. The machines still expect courtesy.'
    :'Everyone is taken to the assessment hall. Your record is intact so far. The last services still count.';
  window.RobotStory={choice,reply,memory,goodbye,lastHuman,verdict,assessment};
})();

(this["webpackJsonploaded-questions"]=this["webpackJsonploaded-questions"]||[]).push([[0],{105:function(e,t,a){e.exports=a(121)},110:function(e,t,a){},111:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},112:function(e,t,a){},121:function(e,t,a){"use strict";a.r(t);var n={};a.r(n),a.d(n,"SET_GAME_STATE",(function(){return O})),a.d(n,"SET_PLAYERLESS_GAME_STATE",(function(){return j})),a.d(n,"setGameState",(function(){return w})),a.d(n,"setPlayerlessGameState",(function(){return N}));var r=a(0),s=a.n(r),l=a(14),i=a.n(l),o=(a(110),a(111),a(112),a(9)),c=a(10),m=a(12),u=a(11),p=a(18),h=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"onHomeClicked",value:function(){this.props.history.push("/")}},{key:"render",value:function(){return s.a.createElement("div",{className:"nav"},s.a.createElement("div",{onClick:this.onHomeClicked.bind(this)},"Loaded questions"))}}]),a}(r.Component),E=Object(p.f)(h),d=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{className:"App-header"},s.a.createElement("a",{className:"App-link",href:"/join"},"Join game"),s.a.createElement("br",null),s.a.createElement("a",{className:"App-link",href:"/create"},"Create game"))}}]),a}(r.Component),g=Object(p.f)(d),y=a(150),f=a(171),S=a(158),v=a(153),b=a(8),k=a(15),O="SET_GAME_STATE",j="SET_PLAYERLESS_GAME_STATE";function w(e){return{type:O,gameState:e}}function N(e){return{type:j,playerlessGameState:e}}var C=Object(y.a)(),G=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={name:"",nameError:!1,code:"",codeError:!1},n}return Object(c.a)(a,[{key:"onNameChange",value:function(e){this.setState({name:e.target.value,nameError:!1})}},{key:"onCodeChange",value:function(e){var t=!1;e.target.value.length>4&&(t=!0),this.setState({code:e.target.value,codeError:t})}},{key:"onJoinClick",value:function(){var e=this;this.state.name&&this.state.code?fetch("/joinGame",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({name:this.state.name,code:this.state.code})}).then((function(e){var t=e.status,a=e.json();return Promise.all([t,a])})).then((function(t){404==t[0]?e.setState((function(e){return e.codeError=!0,e})):(e.props.actions.setGameState(t[1]),e.props.history.push("/game"))})):this.setState((function(t){return t.nameError=!e.state.name,t.codeError=!e.state.code,t}))}},{key:"render",value:function(){return s.a.createElement("div",{className:C.root},s.a.createElement(v.a,{container:!0,spacing:3},s.a.createElement(v.a,{item:!0,xs:4}),s.a.createElement(v.a,{item:!0,xs:4},s.a.createElement(f.a,{id:"outlined-basic",label:"Code",variant:"outlined",fullWidth:!0,vale:this.state.code,onChange:this.onCodeChange.bind(this),error:this.state.codeError})),s.a.createElement(v.a,{item:!0,xs:4}),s.a.createElement(v.a,{item:!0,xs:4}),s.a.createElement(v.a,{item:!0,xs:4},s.a.createElement(f.a,{id:"outlined-basic",label:"Name",variant:"outlined",fullWidth:!0,value:this.state.name,onChange:this.onNameChange.bind(this),error:this.state.nameError})),s.a.createElement(v.a,{item:!0,xs:4}),s.a.createElement(v.a,{item:!0,xs:4}),s.a.createElement(v.a,{item:!0,xs:4},s.a.createElement(S.a,{variant:"contained",color:"primary",fullWidth:!0,onClick:this.onJoinClick.bind(this)},"Join")),s.a.createElement(v.a,{item:!0,xs:4})))}}]),a}(r.Component);var T=Object(p.f)(Object(k.b)(null,(function(e){return{actions:Object(b.a)(n,e)}}))(G)),x=Object(y.a)(),D=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={name:"",nameError:!1},n}return Object(c.a)(a,[{key:"onNameChange",value:function(e){this.setState({name:e.target.value,nameError:!1})}},{key:"onCreateClick",value:function(){var e=this;this.state.name?fetch("/createGame",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({name:this.state.name})}).then((function(e){return e.json()})).then((function(t){e.props.actions.setGameState(t),e.props.history.push("/game"),console.log(t)})):this.setState((function(e){return e.nameError=!0,e}))}},{key:"render",value:function(){return s.a.createElement("div",{className:x.root},s.a.createElement(v.a,{container:!0,spacing:3},s.a.createElement(v.a,{item:!0,xs:4}),s.a.createElement(v.a,{item:!0,xs:4},s.a.createElement(f.a,{id:"outlined-basic",label:"Name",variant:"outlined",fullWidth:!0,value:this.state.name,onChange:this.onNameChange.bind(this),error:this.state.nameError})),s.a.createElement(v.a,{item:!0,xs:4}),s.a.createElement(v.a,{item:!0,xs:4}),s.a.createElement(v.a,{item:!0,xs:4},s.a.createElement(S.a,{variant:"contained",color:"primary",fullWidth:!0,onClick:this.onCreateClick.bind(this)},"Create")),s.a.createElement(v.a,{item:!0,xs:4})))}}]),a}(r.Component);var A=Object(p.f)(Object(k.b)(null,(function(e){return{actions:Object(b.a)(n,e)}}))(D)),K=a(33),L=a(157),P=a(31),U=a.n(P),W=a(22),q=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).onKeyDown=n.onKeyDown.bind(Object(K.a)(n)),n.state={question:"",questionError:!1},n}return Object(c.a)(a,[{key:"onQuestionChange",value:function(e){this.setState({question:e.target.value,questionError:!1})}},{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.onKeyDown,!1)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.onKeyDown,!1)}},{key:"onKeyDown",value:function(e){"Enter"===e.key&&this.onSubmitQuestion()}},{key:"onKeyPress",value:function(e){"Enter"===e.key&&e.preventDefault()}},{key:"onSubmitQuestion",value:function(){this.state.question?(document.removeEventListener("keydown",this.onKeyDown,!1),fetch("/askQuestion",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({token:this.props.gameState.player.token,question:this.state.question})})):this.setState({questionError:!0})}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(L.a,{className:"paper"},s.a.createElement("h1",null,"Ask a question"),s.a.createElement(f.a,{onKeyPress:this.onKeyPress.bind(this),id:"outlined-multiline-flexible",className:"question-text",multiline:!0,rowsMax:4,value:this.state.question,error:this.state.questionError,onChange:this.onQuestionChange.bind(this),variant:"outlined",fullWidth:!0})),s.a.createElement("br",null),s.a.createElement(S.a,{variant:"contained",color:"primary",fullWidth:!0,onClick:this.onSubmitQuestion.bind(this)},"Submit question"))}}]),a}(r.Component);var M=Object(p.f)(Object(k.b)((function(e){return{gameState:e.gameState}}),(function(e){return{actions:Object(b.a)(n,e)}}))(q)),J=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){for(var e,t=0;t<this.props.gameState.players.length;t++)"GUESS"===this.props.gameState.players[t].role&&(e=this.props.gameState.players[t]);return s.a.createElement(L.a,{className:"paper"},s.a.createElement("h1",null,"Question from ",s.a.createElement("span",{className:"text-highlight"},e.name)),s.a.createElement("p",{className:"question"},this.props.gameState.game.currentQuestion))}}]),a}(r.Component);var R=Object(p.f)(Object(k.b)((function(e){return{gameState:e.gameState}}),(function(e){return{actions:Object(b.a)(n,e)}}))(J)),_=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){var e={};if(this.props.gameState.game.answers)for(var t=0;t<this.props.gameState.game.answers.length;t++)e[this.props.gameState.game.answers[t].token]=!0;for(var a=[],n=0;n<this.props.gameState.players.length;n++)e[this.props.gameState.players[n].token]||"GUESS"==this.props.gameState.players[n].role||(a.push(s.a.createElement("span",{className:"text-highlight",key:n},this.props.gameState.players[n].name)),a.push(s.a.createElement("span",{key:n+"span"},", ")));a.splice(-1,1);var r="Waiting for answers from ";if(1==a.length)r="Waiting for answer from ";return s.a.createElement(L.a,{className:"paper"},s.a.createElement("p",{className:"question"},r,a))}}]),a}(r.Component);var I=Object(p.f)(Object(k.b)((function(e){return{gameState:e.gameState}}),(function(e){return{actions:Object(b.a)(n,e)}}))(_)),Q=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).onKeyDown=n.onKeyDown.bind(Object(K.a)(n)),n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.onKeyDown,!1)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.onKeyDown,!1)}},{key:"onKeyDown",value:function(e){"GUESS"===this.props.gameState.player.role&&"Enter"===e.key&&(this.onSubmit(),document.removeEventListener("keydown",this.onKeyDown,!1))}},{key:"onSubmit",value:function(){fetch("/nextTurn",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({token:this.props.gameState.player.token})})}},{key:"render",value:function(){if("GUESS"===this.props.gameState.player.role)return s.a.createElement(S.a,{variant:"contained",color:"primary",fullWidth:!0,onClick:this.onSubmit.bind(this)},"Start next turn");for(var e,t=0;t<this.props.gameState.players.length;t++)"GUESS"===this.props.gameState.players[t].role&&(e=this.props.gameState.players[t]);return s.a.createElement(L.a,{className:"paper"},s.a.createElement("p",null,"Waiting for ",s.a.createElement("span",{className:"text-highlight"},e.name)," to start next turn"))}}]),a}(r.Component);var V=Object(p.f)(Object(k.b)((function(e){return{gameState:e.gameState}}),(function(e){return{actions:Object(b.a)(n,e)}}))(Q)),B=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).onKeyDown=n.onKeyDown.bind(Object(K.a)(n)),n.state={answer:"",answerError:!1},n}return Object(c.a)(a,[{key:"onChange",value:function(e){this.setState({answer:e.target.value,answerError:!1})}},{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.onKeyDown,!1)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.onKeyDown,!1)}},{key:"onKeyDown",value:function(e){"Enter"===e.key&&this.onSubmit()}},{key:"onKeyPress",value:function(e){"Enter"===e.key&&e.preventDefault()}},{key:"onSubmit",value:function(){this.state.answer?(document.removeEventListener("keydown",this.onKeyDown,!1),fetch("/answerQuestion",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({token:this.props.gameState.player.token,answer:this.state.answer})})):this.setState({questionError:!0})}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(L.a,{className:"paper"},s.a.createElement("h1",null,"Answer"),s.a.createElement(f.a,{onKeyPress:this.onKeyPress.bind(this),id:"outlined-multiline-flexible",multiline:!0,rowsMax:4,value:this.state.question,error:this.state.questionError,onChange:this.onChange.bind(this),variant:"outlined",fullWidth:!0})),s.a.createElement("br",null),s.a.createElement(S.a,{variant:"contained",color:"primary",fullWidth:!0,onClick:this.onSubmit.bind(this)},"Submit answer"))}}]),a}(r.Component);var Y=Object(p.f)(Object(k.b)((function(e){return{gameState:e.gameState}}),(function(e){return{actions:Object(b.a)(n,e)}}))(B)),F=a(169),H=a(174),X=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={value:"",flip:!1},n}return Object(c.a)(a,[{key:"onCardClick",value:function(){this.state.flip||this.setState((function(e){return e.flip=!0,e}))}},{key:"onSelection",value:function(e){this.setState((function(t){return t.value=e.target.value,t})),this.props.selection(e.target.value,this.props.id)}},{key:"getCorrectAnswerToken",value:function(){return this.props.answerToken}},{key:"getValue",value:function(){return this.state.value}},{key:"hasValue",value:function(){return""!=this.state.value}},{key:"clearValue",value:function(){this.setState((function(e){return e.value="",e}))}},{key:"renderMenuItems",value:function(){var e=[];if(e.push(s.a.createElement(H.a,{key:"menu",value:""},s.a.createElement("em",null,"None"))),this.props.answeringPlayers)for(var t=0;t<this.props.answeringPlayers.length;t++)e.push(s.a.createElement(H.a,{key:"menu"+t,value:this.props.answeringPlayers[t].token},this.props.answeringPlayers[t].name));return e}},{key:"render",value:function(){var e=this.state.flip?"thecard flip":"thecard";return s.a.createElement("div",{className:"maincontroller"},s.a.createElement("div",{className:e},s.a.createElement(L.a,{className:"front",onClick:this.onCardClick.bind(this)}),s.a.createElement(L.a,{className:"back"},s.a.createElement("div",{className:"answer-row"},s.a.createElement(v.a,{container:!0,spacing:1},s.a.createElement(v.a,{item:!0,xs:10},s.a.createElement("div",{className:"answer"},this.props.answer)),s.a.createElement(v.a,{itme:!0,xs:2},s.a.createElement(F.a,{className:"player-selection",labelId:"demo-simple-select-helper-label",id:"demo-simple-select-helper",value:this.state.value,onChange:this.onSelection.bind(this)},this.renderMenuItems())))))))}}]),a}(r.Component),$=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;Object(o.a)(this,a),(n=t.call(this,e)).onKeyDown=n.onKeyDown.bind(Object(K.a)(n));var r=[];if(e.gameState.players)for(var s=0;s<e.gameState.players.length;s++)e.gameState.players[s].token!=e.guesserToken&&r.push(e.gameState.players[s]);return n.state={disableSubmit:!0,answeringPlayers:r},n}return Object(c.a)(a,[{key:"onSelection",value:function(e,t){var a=!1;for(var n in this.refs)this.refs[n].props.id!==t&&this.refs[n].getValue()===e&&(a=!0,this.refs[n].clearValue());var r=""!==e&&!a;if(1==r)for(var n in this.refs)if(!this.refs[n].hasValue()&&this.refs[n].props.id!=t){r=!1;break}this.setState((function(e){return e.disableSubmit=!r,e}))}},{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.onKeyDown,!1)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.onKeyDown,!1)}},{key:"onKeyDown",value:function(e){this.state.disableSubmit||"Enter"===e.key&&(this.onSubmit(),document.removeEventListener("keydown",this.onKeyDown,!1))}},{key:"onSubmit",value:function(){var e,t=[];for(var a in this.refs)e=this.refs[a],t.push({answer:e.getCorrectAnswerToken(),guess:e.getValue()});fetch("/lockInGuesses",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({token:this.props.gameState.player.token,answers:t})})}},{key:"render",value:function(){for(var e,t=this.props.gameState.game.answers,a=[],n=0;n<t.length;n++)a.push(s.a.createElement(X,{key:"answers"+n,id:n,ref:"answers"+n,answer:t[n].answer,answerToken:t[n].token,answeringPlayers:this.state.answeringPlayers,selection:this.onSelection.bind(this)})),a.push(s.a.createElement("br",{key:"br"+n}));a.splice(-1,1);for(n=0;n<this.props.gameState.players.length;n++)"GUESS"===this.props.gameState.players[n].role&&(e=this.props.gameState.players[n]);return s.a.createElement("div",null,s.a.createElement(L.a,{className:"paper"},s.a.createElement("h1",null,"You're the reader.",s.a.createElement("br",null),s.a.createElement("span",{className:"text-highlight"},e.name)," is guessing."),s.a.createElement("p",null,"Click to reveal answers"),a),s.a.createElement("br",null),s.a.createElement(S.a,{variant:"contained",color:"primary",fullWidth:!0,disabled:this.state.disableSubmit,onClick:this.onSubmit.bind(this)},"Lock in guesses"))}}]),a}(r.Component);var z=Object(p.f)(Object(k.b)((function(e){return{gameState:e.gameState}}),(function(e){return{actions:Object(b.a)(n,e)}}))($)),Z=a(159),ee=a(160),te=a(6),ae=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={wasClicked:!1},n}return Object(c.a)(a,[{key:"onLikeButtonClick",value:function(){this.state.wasClicked||(fetch("/likeAnswer",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({token:this.props.token})}),this.setState((function(e){return e.wasClicked=!0,e})))}},{key:"render",value:function(){var e=this.state.wasClicked?"like-cell like-button-clicked":"like-cell like-button",t=this.props.token==this.props.playerToken?s.a.createElement(Z.a,{className:"like-cell"}):s.a.createElement(Z.a,{className:e,align:"right",onClick:this.onLikeButtonClick.bind(this)},s.a.createElement(W.a,{icon:te.f}));return s.a.createElement(ee.a,{className:this.props.rowClass},s.a.createElement(Z.a,{className:"text-highlight"},this.props.name," "),s.a.createElement(Z.a,null,this.props.answer),s.a.createElement(Z.a,{align:"right"},this.props.guessedCorrectly?"+100":"+0"),t)}}]),a}(r.Component),ne=a(161),re=a(163),se=a(162),le=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){for(var e,t={},a=0;a<this.props.gameState.players.length;a++)"GUESS"===this.props.gameState.players[a].role&&(e=this.props.gameState.players[a]),t[this.props.gameState.players[a].token]=this.props.gameState.players[a];var n=0,r=[];for(a=0;a<this.props.gameState.game.results.length;a++){var l=this.props.gameState.game.results[a];n+=l.guessedCorrectly?100:0;var i=l.guessedCorrectly?"correct-row":"incorrect-row";r.push(s.a.createElement(ae,{key:a,rowClass:i,name:t[l.token].name,token:l.token,answer:l.answer,guessedCorrectly:l.guessedCorrectly,playerToken:this.props.gameState.player.token}))}var o=null;this.props.gameState.game.bonusScore>0&&(n+=this.props.gameState.game.bonusScore,o=s.a.createElement(ee.a,null,s.a.createElement(Z.a,null,s.a.createElement("strong",null,"BONUS")),s.a.createElement(Z.a,null),s.a.createElement(Z.a,{align:"right"},s.a.createElement("strong",null,"+"+this.props.gameState.game.bonusScore))));var c=s.a.createElement(ee.a,{className:"total-row"},s.a.createElement(Z.a,null,s.a.createElement("strong",null,"Total")),s.a.createElement(Z.a,null),s.a.createElement(Z.a,{align:"right"},s.a.createElement("strong",null,"+"+n)));return s.a.createElement(L.a,{className:"paper"},s.a.createElement("h1",{className:"results-header"},"Results for ",s.a.createElement("span",{className:"text-highlight"},e.name)),s.a.createElement(ne.a,{"aria-label":"simple table"},s.a.createElement(se.a,null,s.a.createElement(ee.a,null,s.a.createElement(Z.a,null,"Player"),s.a.createElement(Z.a,null,"Answer"),s.a.createElement(Z.a,{align:"right"},"Score"),s.a.createElement(Z.a,{className:"like-cell",align:"right"}))),s.a.createElement(re.a,null,r,o,c)))}}]),a}(r.Component);var ie=Object(p.f)(Object(k.b)((function(e){return{gameState:e.gameState}}),(function(e){return{actions:Object(b.a)(n,e)}}))(le)),oe=a(74),ce=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"renderScores",value:function(){var e=Object(oe.a)(this.props.gameState.players);e.sort((function(e,t){return t.score-e.score}));for(var t=[],a={},n=0,r=1;r<=e.length;r++){var l=e[r-1];a[l.score]||(n+=1,a[l.score]=n);var i=1==n?s.a.createElement(W.a,{icon:te.c}):s.a.createElement("span",{className:"icon-placeholder"});t.push(s.a.createElement("div",{key:r,className:"final-reslts-row"},s.a.createElement("span",{className:"final-results-name"},i,s.a.createElement("span",{className:"name"},a[l.score],". ",l.name)),s.a.createElement("span",{className:"final-results-score"},l.score)))}return t}},{key:"renderLikes",value:function(){var e=Object(oe.a)(this.props.gameState.players);e.sort((function(e,t){return t.likes-e.likes}));for(var t=[],a={},n=0,r=1;r<=e.length;r++){var l=e[r-1];a[l.likes]||(n+=1,a[l.likes]=n);var i=1==n?s.a.createElement(W.a,{icon:te.f}):s.a.createElement("span",{className:"icon-placeholder"});t.push(s.a.createElement("div",{key:r,className:"final-reslts-row"},s.a.createElement("span",{className:"final-results-name"},i,s.a.createElement("span",{className:"name"},a[l.likes],". ",l.name)),s.a.createElement("span",{className:"final-results-score"},l.likes)))}return t}},{key:"render",value:function(){return s.a.createElement(v.a,{container:!0,spacing:2},s.a.createElement(v.a,{item:!0,xs:1}),s.a.createElement(v.a,{item:!0,xs:5},s.a.createElement(L.a,{className:"paper"},s.a.createElement("h1",null,"Final Scores"),s.a.createElement("div",{className:"final-scores-container"},this.renderScores()))),s.a.createElement(v.a,{item:!0,xs:5},s.a.createElement(L.a,{className:"paper"},s.a.createElement("h1",null,"Most Likes"),s.a.createElement("div",{className:"final-scores-container"},this.renderLikes()))),s.a.createElement(v.a,{item:!0,xs:1}))}}]),a}(r.Component);var me=Object(p.f)(Object(k.b)((function(e){return{gameState:e.gameState}}),(function(e){return{actions:Object(b.a)(n,e)}}))(ce)),ue=a(172),pe=a(167),he=a(165),Ee=a(166),de=a(164),ge=["ASKING","ANSWERING","GUESSING","RESULTS"],ye=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={gameState:{},openEndGameDialog:!1},n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){this.props.gameState.game?fetch("/gameState",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({token:this.props.gameState.player.token})}):this.props.history.push("/")}},{key:"onStartGameClick",value:function(){fetch("/startGame",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({token:this.props.gameState.player.token})})}},{key:"onEndGame",value:function(){fetch("/endGame",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({token:this.props.gameState.player.token})}),this.handleEndGameDialogClose()}},{key:"handleMessage",value:function(e){var t=JSON.parse(e.body);this.props.actions.setPlayerlessGameState(t)}},{key:"renderMainView",value:function(e,t,a){if("NOT_STARTED"===this.props.gameState.game.state&&e)return s.a.createElement(L.a,{className:"paper"},s.a.createElement("h1",null,"Waiting for ",s.a.createElement("span",{className:"text-highlight"},e.name)," to start the game."),s.a.createElement(W.a,{className:"loading",icon:te.d}));if("ASKING"===this.props.gameState.game.state&&"GUESS"!==this.props.gameState.player.role)return s.a.createElement(L.a,{className:"paper"},s.a.createElement("h1",null,s.a.createElement("span",{className:"text-highlight"},e.name)," is asking a question."));if("ASKING"===this.props.gameState.game.state&&"GUESS"===this.props.gameState.player.role)return s.a.createElement(M,null);if("ANSWERING"===this.props.gameState.game.state){if("GUESS"===this.props.gameState.player.role)return s.a.createElement("div",null,s.a.createElement(R,null),s.a.createElement("br",null),s.a.createElement(I,null));if("GUESS"!==this.props.gameState.player.role){var n={};if(this.props.gameState.game.answers)for(var r=0;r<this.props.gameState.game.answers.length;r++)n[this.props.gameState.game.answers[r].token]=!0;var l=n[this.props.gameState.player.token];return s.a.createElement("div",null,s.a.createElement(R,null),s.a.createElement("br",null),l?s.a.createElement("div",null):s.a.createElement("div",null,s.a.createElement(Y,null),s.a.createElement("br",null)),s.a.createElement(I,null))}}return"GUESSING"===this.props.gameState.game.state?"READ"!==this.props.gameState.player.role?s.a.createElement("div",null,s.a.createElement(R,null),s.a.createElement("br",null),s.a.createElement(L.a,{className:"paper"},s.a.createElement("h1",null,s.a.createElement("span",{className:"text-highlight"},t.name)," is reading the answers.",s.a.createElement("br",null),s.a.createElement("span",{className:"text-highlight"},a.name)," is guessing."))):s.a.createElement("div",null,s.a.createElement(R,null),s.a.createElement("br",null),s.a.createElement(z,{guesserToken:a.token})):"RESULTS"===this.props.gameState.game.state?s.a.createElement("div",null,s.a.createElement(R,null),s.a.createElement("br",null),s.a.createElement(ie,null),s.a.createElement("br",null),s.a.createElement(V,null)):s.a.createElement("div",null)}},{key:"onEndGameClick",value:function(){this.setState((function(e){return e.openEndGameDialog=!0,e}))}},{key:"handleEndGameDialogClose",value:function(){this.setState((function(e){return e.openEndGameDialog=!1,e}))}},{key:"renderEndGameButtom",value:function(e){return"RESULTS"===this.props.gameState.game.state&&this.props.gameState.player.token===e.token?s.a.createElement("div",null,s.a.createElement(ue.a,{open:this.state.openEndGameDialog,onClose:this.handleEndGameDialogClose.bind(this),"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},s.a.createElement(de.a,{id:"alert-dialog-title"},"End game"),s.a.createElement(he.a,null,s.a.createElement(Ee.a,{id:"alert-dialog-description"},"Are you sure you want to end the game?")),s.a.createElement(pe.a,null,s.a.createElement(S.a,{onClick:this.handleEndGameDialogClose.bind(this),color:"primary"},"NO"),s.a.createElement(S.a,{onClick:this.onEndGame.bind(this),color:"primary",autoFocus:!0},"YES"))),s.a.createElement(S.a,{variant:"contained",color:"primary",fullWidth:!0,onClick:this.onEndGameClick.bind(this)},"End game")):null}},{key:"render",value:function(){if(!this.props.gameState.game)return s.a.createElement("div",null);if("FINAL_RESULTS"===this.props.gameState.game.state)return s.a.createElement(me,null);for(var e,t,a,n=[],r=0;r<this.props.gameState.players.length;r++){this.props.gameState.players[r].isLeader&&(e=this.props.gameState.players[r]),"GUESS"===this.props.gameState.players[r].role?a=this.props.gameState.players[r]:"READ"===this.props.gameState.players[r].role&&(t=this.props.gameState.players[r]);var l=null;l="NOT_STARTED"===this.props.gameState.game.state&&this.props.gameState.players[r].isLeader?s.a.createElement(W.a,{className:"player-icon",icon:te.e}):ge.indexOf(this.props.gameState.game.state)>-1&&"READ"===this.props.gameState.players[r].role?s.a.createElement(W.a,{className:"player-icon",icon:te.b}):ge.indexOf(this.props.gameState.game.state)>-1&&"GUESS"===this.props.gameState.players[r].role?s.a.createElement(W.a,{className:"player-icon",icon:te.a}):s.a.createElement("span",{className:"icon-placeholder"});var i=s.a.createElement("span",null);"NOT_STARTED"!==this.props.gameState.game.state&&(i=s.a.createElement("span",{className:"player-score"},this.props.gameState.players[r].score));var o=this.props.gameState.players[r].token===this.props.gameState.player.token?"player-row text-highlight":"player-row";n.push(s.a.createElement("div",{key:r,className:o},l,s.a.createElement("span",{className:"player-name"},this.props.gameState.players[r].name),i))}var c=this.renderMainView(e,t,a),m=this.renderEndGameButtom(a);return s.a.createElement(U.a,{endpoint:"ws://localhost:8080/socket/gs-guide-websocket",topic:"topic/greetings/"+this.props.gameState.game.code,onMessage:this.handleMessage.bind(this)},s.a.createElement("div",null,s.a.createElement(v.a,{container:!0,spacing:2},s.a.createElement(v.a,{item:!0,xs:1}),s.a.createElement(v.a,{item:!0,xs:3},s.a.createElement(L.a,{className:"paper"},s.a.createElement("h1",{className:"players-title"},"Players"),s.a.createElement("div",{className:"players-list"},n),this.props.gameState.player.isLeader&&"NOT_STARTED"===this.props.gameState.game.state?s.a.createElement(S.a,{variant:"contained",color:"primary",fullWidth:!0,onClick:this.onStartGameClick.bind(this)},"Start game"):s.a.createElement("div",null)),s.a.createElement("br",null),s.a.createElement(L.a,{className:"paper"},s.a.createElement("div",null,"Code: ",this.props.gameState.game.code)),s.a.createElement("br",null),m),s.a.createElement(v.a,{item:!0,xs:7},c))))}}]),a}(r.Component);var fe=Object(p.f)(Object(k.b)((function(e){return console.log("REDUX"),console.log(e),{gameState:e.gameState}}),(function(e){return{actions:Object(b.a)(n,e)}}))(ye)),Se=a(84),ve=a(168),be=a(82),ke=a.n(be),Oe=a(83),je=a.n(Oe),we=Object(Se.a)({root:{flexGrow:1},palette:{type:"dark",primary:ke.a,secondary:je.a},status:{danger:"orange"}});var Ne=Object(p.f)((function(){return s.a.createElement("div",{className:"App"},s.a.createElement(ve.a,{theme:we},s.a.createElement(E,null),s.a.createElement("div",{className:"app-body"},s.a.createElement(p.c,null,s.a.createElement(p.a,{exact:!0,path:"/",component:g}),s.a.createElement(p.a,{exact:!0,path:"/join",component:T}),s.a.createElement(p.a,{path:"/create",component:A}),s.a.createElement(p.a,{path:"/game",component:fe}),s.a.createElement(p.a,{component:g})))))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Ce=a(20),Ge=a(68),Te="loaded-question";var xe=Object(b.b)({gameState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,a=new Ge.a;switch(t.type){case O:return e=t.gameState,a.set(Te+"-user",e,{path:"/"}),e;case j:var n=e;n.game=t.playerlessGameState.game,n.players=t.playerlessGameState.players;for(var r=0;r<n.players.length;r++)if(n.player.token===n.players[r].token){n.player.role=n.players[r].role,console.log("role : "+n.player.role);break}return a.set(Te+"-user",n,{path:"/"}),{game:t.playerlessGameState.game,players:t.playerlessGameState.players,player:n.player};default:return e}}}),De=(new Ge.a).get(Te+"-user");console.log(De);var Ae=Object(b.c)(xe,{gameState:De});i.a.render(s.a.createElement(k.a,{store:Ae},s.a.createElement(Ce.a,null,s.a.createElement(Ne,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[105,1,2]]]);
//# sourceMappingURL=main.0a15f2a9.chunk.js.map
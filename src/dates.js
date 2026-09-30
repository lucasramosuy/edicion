export const months=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
export function parsePublication(value){const m=/^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value??'');if(!m)return null;const [,d,mo,y]=m;const date=new Date(Date.UTC(+y,+mo-1,+d));return date.getUTCFullYear()===+y&&date.getUTCMonth()===+mo-1&&date.getUTCDate()===+d?{day:+d,month:+mo,year:+y,iso:`${y}-${mo}-${d}`} :null;}
export function validDay(day,month){return Number.isInteger(day)&&Number.isInteger(month)&&month>=1&&month<=12&&day>=1&&day<=new Date(Date.UTC(2000,month,0)).getUTCDate();}
export function shiftDay(day,month,step){const d=new Date(Date.UTC(2000,month-1,day+step));return {day:d.getUTCDate(),month:d.getUTCMonth()+1};}
export function montevideoToday(now=new Date()){const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/Montevideo',month:'numeric',day:'numeric'}).formatToParts(now);return {day:+p.find(x=>x.type==='day').value,month:+p.find(x=>x.type==='month').value};}
export function recordsFor(index,day,month){return index.records.filter(n=>n.day===day&&n.month===month).sort((a,b)=>b.year-a.year||a.name.localeCompare(b.name,'es'));}

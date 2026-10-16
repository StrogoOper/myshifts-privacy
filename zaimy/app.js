
(function(){
 const f=document.getElementById('loan-calc');if(!f)return;
 const by=id=>document.getElementById(id);
 const rub=new Intl.NumberFormat('ru-RU',{style:'currency',currency:'RUB',maximumFractionDigits:2});
 const calc=()=>{
 const amount=Number(f.elements.amount.value),days=Number(f.elements.days.value),rate=Number(f.elements.rate.value);
 const valid=Number.isFinite(amount)&&amount>0&&amount<=10000000&&Number.isInteger(days)&&days>0&&days<=365&&Number.isFinite(rate)&&rate>=0&&rate<=10;
 by('calc-error').textContent=valid?'':'Укажите положительную сумму, срок от 1 до 365 дней и ставку от 0 до 10% в день.';
 if(!valid){['calctotal','calcinterest','calcamount'].forEach(x=>by(x).textContent='—');return;}
 const interest=amount*rate/100*days;by('calctotal').textContent=rub.format(amount+interest);by('calcinterest').textContent=rub.format(interest);by('calcamount').textContent=rub.format(amount);
 };
 f.addEventListener('input',calc);calc();
})();

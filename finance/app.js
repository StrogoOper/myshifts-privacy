
(function(){
 const form=document.getElementById("mortgage-form");
 if(!form)return;
 const fmt=new Intl.NumberFormat("ru-RU",{maximumFractionDigits:0});
 const money=n=>Number.isFinite(n)?fmt.format(Math.round(n))+" ₽":"—";
 const calc=()=>{
  const price=Number(form.elements.price.value),down=Number(form.elements.down.value),rate=Number(form.elements.rate.value),years=Number(form.elements.years.value);
  const msg=document.getElementById("calc-error");
  if(![price,down,rate,years].every(Number.isFinite)||price<=0||down<0||down>=price||rate<0||rate>100||years<=0||years>40){
   msg.textContent="Проверьте значения: первоначальный взнос должен быть меньше стоимости, срок — от 1 до 40 лет, ставка — от 0 до 100 %.";
   for(const id of ["payment","principal","total","overpayment"])document.getElementById(id).textContent="—";
   document.getElementById("principal-bar").style.width="0%";
   return;
  }
  msg.textContent="";
  const sum=price-down,months=Math.round(years*12),r=rate/1200;
  const monthly=r===0?sum/months:sum*r/(1-Math.pow(1+r,-months));
  const total=monthly*months,interest=Math.max(0,total-sum);
  document.getElementById("payment").textContent=money(monthly);
  document.getElementById("principal").textContent=money(sum);
  document.getElementById("total").textContent=money(total);
  document.getElementById("overpayment").textContent=money(interest);
  document.getElementById("principal-bar").style.width=(total>0?Math.max(0,Math.min(100,100*sum/total)):0)+"%";
 };
 form.addEventListener("input",calc);calc();
})();

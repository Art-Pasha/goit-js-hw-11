import{a as p,S as h,i as n}from"./assets/vendor-DcHCnVjq.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const g="55943093-04169c999cae84f64fe89e1ec",y="https://pixabay.com/api/";function b(s){const t=new URLSearchParams({key:g,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true"});return p.get(`${y}?${t}`).then(o=>o.data)}const u=document.querySelector(".gallery"),m=document.querySelector(".loader");let L=new h(".gallery a",{captionsData:"alt",captionDelay:250});function P(s){const t=s.map(({webformatURL:o,largeImageURL:a,tags:e,likes:r,views:i,comments:d,downloads:f})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${a}">
        <img class="gallery-image" src="${o}" alt="${e}" />
        <div class="info">
          <p><b>Likes:</b> ${r}</p>
          <p><b>Views:</b> ${i}</p>
          <p><b>Comments:</b> ${d}</p>
          <p><b>Downloads:</b> ${f}</p>
        </div>
      </a>
    </li>`).join("");u.insertAdjacentHTML("beforeend",t),L.refresh()}function S(){u.innerHTML=""}function w(){m.classList.remove("is-hidden")}function c(){m.classList.add("is-hidden")}const l=document.querySelector("#search-form");l.addEventListener("submit",s=>{s.preventDefault();const t=s.currentTarget.elements["search-text"].value.trim();if(t===""){n.warning({message:"Please enter a search query",position:"topRight"});return}S(),w(),b(t).then(o=>{if(c(),o.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}P(o.hits)}).catch(o=>{c(),console.error(o),n.error({message:"Something went wrong. Please try again later.",position:"topRight"})}).finally(()=>{l.reset()})});
//# sourceMappingURL=index.js.map

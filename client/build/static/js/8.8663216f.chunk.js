(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[8],{318:function(e,t,n){"use strict";n.r(t);var c=n(14),i=n(2),r=n(0),s=n(9),l=n(37),a=n(81),j=n(5),o=n(25),d=n(6),b=n(1),h=n(40),O=Object(h.a)(r.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),u=Object(h.a)(r.createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete"),m=n(46);function x(){var e=Object(j.a)(["\n   position: relative;\n   background: var(--color-grey-light-2);\n   transition: background 0.25s;\n   &:hover {\n      background: var(--color-grey-light-3);\n   }\n\n   .like {\n      &__window {\n         text-align: center;\n      }\n\n      &__windowtitle {\n         font-size: 1.7rem !important;\n      }\n\n      &__portalbtn {\n         position: absolute;\n         top: 0.5rem;\n         right: 0.5rem;\n      }\n      &__deletebtn {\n         color: ",";\n      }\n   }\n"]);return x=function(){return e},e}var v=Object(d.c)((function(e){var t,n,j=e.like,d=e.className,b=Object(l.b)().user,h=Object(a.c)(),x=Object(c.a)(h,2)[1].deleteLike,v=Object(r.useState)(!1),k=Object(c.a)(v,2),p=k[0],f=k[1];return Object(i.jsxs)(s.m.Item,{className:d,children:[Object(i.jsx)(m.c,{open:p,setOpen:f,toggleButton:Object(i.jsx)(s.a,{modifiers:"transparent",className:"like__portalbtn",onClick:function(){return f(!0)},children:Object(i.jsx)(s.h,{as:O})}),children:Object(i.jsxs)(s.e,{direction:"column",y:"center",children:[Object(i.jsx)(s.s,{children:"Are you sure you want to remove this item?"}),Object(i.jsxs)(s.a,{modifiers:"outline",className:"like__deletebtn",onClick:(t=b._id,n=j.videoId,function(){x(t,n),f(!1)}),children:[Object(i.jsx)(s.h,{as:u}),Object(i.jsx)(s.r,{children:"Remove"})]})]})}),Object(i.jsx)(s.l,{as:o.b,to:"/watch/".concat(j.videoId),children:Object(i.jsxs)(s.n,{flexy:"center",children:[Object(i.jsx)(s.n.Item,{width:"20",children:Object(i.jsx)(s.j,{children:Object(i.jsx)(s.i,{src:j.image,alt:j.title})})}),Object(i.jsxs)(s.n.Item,{width:"75",mg:{x:"1%"},children:[Object(i.jsx)(s.s,{as:"h2",modifiers:"small",children:j.title}),Object(i.jsx)(s.s,{as:"h3",modifiers:["small","light"],children:j.channelTitle})]})]})})]})}))(x(),b.a.dark2);t.default=function(e){var t,n=e.className,j=Object(l.b)().user,o=Object(a.c)(),d=Object(c.a)(o,2),b=d[0],h=b.userLikes,O=b.statusUserLikes,u=b.errorUserLikes,x=d[1].getUserLikes;return Object(r.useEffect)((function(){j&&x(j._id)}),[j,x]),"idle"===O||"pending"===O?Object(i.jsx)(m.e,{modifiers:"dark"}):"rejected"===O&&u?Object(i.jsx)(s.c,{width:"10",children:Object(i.jsx)(m.b,{severity:"error",text:u})}):"resolved"===O?Object(i.jsx)(s.c,{width:"10",className:n,children:Object(i.jsx)(s.b,{width:{desktop:"60",tabland:"70",tabport:"90"},my:"2",children:Object(i.jsx)("nav",{children:Object(i.jsx)(s.m,{children:(t=h,null===t||void 0===t?void 0:t.map((function(e){return Object(i.jsx)(v,{like:e},e._id)})))})})})}):void 0}}}]);
//# sourceMappingURL=8.8663216f.chunk.js.map
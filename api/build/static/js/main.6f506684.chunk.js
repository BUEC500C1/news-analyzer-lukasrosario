(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{26:function(e,t,n){},34:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),r=n(18),s=n.n(r),l=(n(26),n(4)),i=n(14),o=n(2),b=n(5),d=n(21),j=n(19),x=Object(j.createAuthProvider)({accessTokenKey:"access_token",onUpdateToken:function(e){return fetch("/api/refresh",{method:"POST",body:e.access_token}).then((function(e){return e.json()}))}}),u=Object(l.a)(x,4),h=u[0],m=(u[1],u[2],u[3],n(0)),p=function(e){var t=e.component,n=Object(d.a)(e,["component"]),c=h(),a=Object(l.a)(c,1)[0];return Object(m.jsx)(o.b,Object(b.a)(Object(b.a)({},n),{},{render:function(e){return a?Object(m.jsx)(t,Object(b.a)({},e)):Object(m.jsx)(o.a,{to:"/login"})}}))},g=n(9),O=function(e){var t=e.children,n=e.show;return Object(m.jsxs)("div",{className:"w-full h-full absolute flex items-center justify-center ".concat(n?"flex":"hidden"),children:[Object(m.jsx)("div",{className:"w-full h-full absolute bg-black opacity-30 flex items-center justify-center"}),Object(m.jsx)("div",{className:"flex px-36 py-16 z-10 bg-gray-800 rounded-md",children:t})]})},w=function(e){var t=e.show,n=Object(c.useState)({email:"",password:""}),a=Object(l.a)(n,2),r=a[0],s=a[1],i=function(e){s(Object(b.a)(Object(b.a)({},r),{},Object(g.a)({},e.target.name,e.target.value)))};return Object(m.jsx)(O,{show:t,children:Object(m.jsxs)("div",{className:"w-full h-full flex flex-col",children:[Object(m.jsx)("input",{name:"email",type:"email",placeholder:"Email",className:"w-72 py-2 text-xl border-2 border-green-300 rounded-md bg-gray-700 text-white pl-2 mb-6",value:r.email,onChange:i}),Object(m.jsx)("input",{name:"password",type:"password",placeholder:"Password",className:"w-72 py-2 text-xl border-2 border-green-300 rounded-md bg-gray-700 text-white pl-2 mb-12",value:r.password,onChange:i}),Object(m.jsx)("button",{class:"bg-green-500 px-8 py-2 rounded-md text-xl text-white hover:bg-green-400",children:"Sign Up"})]})})},f=n.p+"static/media/news.cbd8e7dc.jpg",y=function(){var e=Object(c.useState)(!1),t=Object(l.a)(e,2),n=t[0],a=t[1];return Object(m.jsxs)("div",{className:"w-full min-h-screen flex flex-row",children:[Object(m.jsx)(w,{show:n}),Object(m.jsx)("div",{style:{backgroundImage:"url(".concat(f,")")},className:"w-7/12 min-h-screen bg-cover bg-bottom"}),Object(m.jsxs)("div",{className:"w-5/12 px-12 h-full min-h-screen bg-gray-800 flex flex-col items-start justify-center space-y-8",children:[Object(m.jsx)("p",{className:"text-4xl text-white",children:"Join now to start analyzing the news."}),Object(m.jsx)("button",{onClick:function(){a(!0)},class:"w-36 bg-green-500 py-2 rounded-md text-xl text-white hover:bg-green-400",children:"Sign up"}),Object(m.jsx)("button",{class:"w-36 border-2 border-green-500 py-2 rounded-md text-xl text-white hover:border-green-400",children:"Log in"})]})]})},v=function(){var e=Object(c.useState)({email:"",password:""}),t=Object(l.a)(e,2),n=t[0],a=t[1],r=function(e){a(Object(b.a)(Object(b.a)({},n),{},Object(g.a)({},e.target.name,e.target.value)))};return Object(m.jsxs)("div",{className:"bg-gray-800 w-full flex flex-col min-h-screen items-center justify-center space-y-12",children:[Object(m.jsx)("p",{className:"text-5xl text-white",children:"Welcome back!"}),Object(m.jsx)("input",{name:"email",type:"email",placeholder:"Email",className:"w-72 py-2 text-xl border-2 border-green-300 rounded-md bg-gray-700 text-white pl-2",value:n.email,onChange:r}),Object(m.jsx)("input",{name:"password",type:"password",placeholder:"Password",className:"w-72 py-2 text-xl border-2 border-green-300 rounded-md bg-gray-700 text-white pl-2",value:n.password,onChange:r}),Object(m.jsx)("button",{class:"bg-green-500 px-8 py-2 rounded-md text-xl text-white hover:bg-green-400",children:"Log in"}),Object(m.jsxs)("p",{className:"text-md text-white inline",children:["New user?"," ",Object(m.jsx)("a",{href:"/signup",className:"inline text-md text-green-500",children:"Sign up here."})]})]})},N=function(){var e=Object(c.useState)({email:"",password:""}),t=Object(l.a)(e,2),n=t[0],a=t[1],r=function(e){a(Object(b.a)(Object(b.a)({},n),{},Object(g.a)({},e.target.name,e.target.value)))};return Object(m.jsxs)("div",{className:"bg-gray-800 w-full flex flex-col min-h-screen items-center justify-center space-y-12",children:[Object(m.jsx)("p",{className:"text-5xl text-white",children:"Sign up now to start analyzing articles!"}),Object(m.jsx)("input",{name:"email",type:"email",placeholder:"Email",className:"w-72 py-2 text-xl border-2 border-green-300 rounded-md bg-gray-700 text-white pl-2",value:n.email,onChange:r}),Object(m.jsx)("input",{name:"password",type:"password",placeholder:"Password",className:"w-72 py-2 text-xl border-2 border-green-300 rounded-md bg-gray-700 text-white pl-2",value:n.password,onChange:r}),Object(m.jsx)("button",{class:"bg-green-500 px-8 py-2 rounded-md text-xl text-white hover:bg-green-400",children:"Sign Up"}),Object(m.jsxs)("p",{className:"text-md text-white inline",children:["Already have an account?"," ",Object(m.jsx)("a",{href:"/login",className:"inline text-md text-green-500",children:"Log in here."})]})]})},S=function(){return"hello"},k=function(){return Object(m.jsx)("div",{className:"w-full min-h-screen bg-blue-400",children:"hello"})},C=function(){var e=h(),t=Object(l.a)(e,1)[0];return Object(m.jsx)(i.a,{children:Object(m.jsxs)(o.d,{children:[Object(m.jsx)(o.b,{exact:!0,path:"/",render:function(){return t?Object(m.jsx)(S,{}):Object(m.jsx)(y,{})}}),Object(m.jsx)(o.b,{exact:!0,path:"/login",render:function(){return t?Object(m.jsx)(o.a,{to:"/"}):Object(m.jsx)(v,{})}}),Object(m.jsx)(o.b,{exact:!0,path:"/signup",render:function(){return t?Object(m.jsx)(o.a,{to:"/"}):Object(m.jsx)(N,{})}}),Object(m.jsx)(p,{exact:!0,path:"/dashboard",component:k}),Object(m.jsx)(o.b,{exact:!0,path:"/404",component:k}),Object(m.jsx)(o.a,{to:"/404"})]})})},P=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,35)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),c(e),a(e),r(e),s(e)}))};s.a.render(Object(m.jsx)(a.a.StrictMode,{children:Object(m.jsx)(C,{})}),document.getElementById("root")),P()}},[[34,1,2]]]);
//# sourceMappingURL=main.6f506684.chunk.js.map
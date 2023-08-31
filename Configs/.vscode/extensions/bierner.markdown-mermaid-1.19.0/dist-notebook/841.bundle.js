(self.webpackChunkmarkdown_mermaid=self.webpackChunkmarkdown_mermaid||[]).push([[841],{9368:(e,t,n)=>{n.d(t,{c:()=>o});var r=n(9360),i=n(9103);const d=function(e){return(0,i.Z)(e,4)};var a=n(3836);n(5351);function o(e){var t={options:{directed:e.isDirected(),multigraph:e.isMultigraph(),compound:e.isCompound()},nodes:l(e),edges:s(e)};return r.Z(e.graph())||(t.value=d(e.graph())),t}function l(e){return a.Z(e.nodes(),(function(t){var n=e.node(t),i=e.parent(t),d={v:t};return r.Z(n)||(d.value=n),r.Z(i)||(d.parent=i),d}))}function s(e){return a.Z(e.edges(),(function(t){var n=e.edge(t),i={v:t.v,w:t.w};return r.Z(t.name)||(i.name=t.name),r.Z(n)||(i.value=n),i}))}},3841:(e,t,n)=>{n.d(t,{r:()=>N});var r=n(2890),i=n(9368),d=n(8234),a=n(8046),o=n(5625),l=n(4309);let s={},c={},h={};const g=(e,t)=>(a.l.trace("In isDecendant",t," ",e," = ",c[t].includes(e)),!!c[t].includes(e)),f=(e,t,n,r)=>{a.l.warn("Copying children of ",e,"root",r,"data",t.node(e),r);const i=t.children(e)||[];e!==r&&i.push(e),a.l.warn("Copying (nodes) clusterId",e,"nodes",i),i.forEach((i=>{if(t.children(i).length>0)f(i,t,n,r);else{const d=t.node(i);a.l.info("cp ",i," to ",r," with parent ",e),n.setNode(i,d),r!==t.parent(i)&&(a.l.warn("Setting parent",i,t.parent(i)),n.setParent(i,t.parent(i))),e!==r&&i!==e?(a.l.debug("Setting parent",i,e),n.setParent(i,e)):(a.l.info("In copy ",e,"root",r,"data",t.node(e),r),a.l.debug("Not Setting parent for node=",i,"cluster!==rootId",e!==r,"node!==clusterId",i!==e));const o=t.edges(i);a.l.debug("Copying Edges",o),o.forEach((i=>{a.l.info("Edge",i);const d=t.edge(i.v,i.w,i.name);a.l.info("Edge data",d,r);try{((e,t)=>(a.l.info("Decendants of ",t," is ",c[t]),a.l.info("Edge is ",e),e.v!==t&&e.w!==t&&(c[t]?c[t].includes(e.v)||g(e.v,t)||g(e.w,t)||c[t].includes(e.w):(a.l.debug("Tilt, ",t,",not in decendants"),!1))))(i,r)?(a.l.info("Copying as ",i.v,i.w,d,i.name),n.setEdge(i.v,i.w,d,i.name),a.l.info("newGraph edges ",n.edges(),n.edge(n.edges()[0]))):a.l.info("Skipping copy of edge ",i.v,"--\x3e",i.w," rootId: ",r," clusterId:",e)}catch(e){a.l.error(e)}}))}a.l.debug("Removing node",i),t.removeNode(i)}))},u=(e,t)=>{const n=t.children(e);let r=[...n];for(const i of n)h[i]=e,r=[...r,...u(i,t)];return r},w=(e,t)=>{a.l.trace("Searching",e);const n=t.children(e);if(a.l.trace("Searching children of id ",e,n),n.length<1)return a.l.trace("This is a valid node",e),e;for(const r of n){const n=w(r,t);if(n)return a.l.trace("Found replacement for",e," => ",n),n}},p=e=>s[e]&&s[e].externalConnections&&s[e]?s[e].id:e,v=(e,t)=>{if(a.l.warn("extractor - ",t,i.c(e),e.children("D")),t>10)return void a.l.error("Bailing out");let n=e.nodes(),r=!1;for(const t of n){const n=e.children(t);r=r||n.length>0}if(r){a.l.debug("Nodes = ",n,t);for(const r of n)if(a.l.debug("Extracting node",r,s,s[r]&&!s[r].externalConnections,!e.parent(r),e.node(r),e.children("D")," Depth ",t),s[r])if(!s[r].externalConnections&&e.children(r)&&e.children(r).length>0){a.l.warn("Cluster without external connections, without a parent and with children",r,t);let n="TB"===e.graph().rankdir?"LR":"TB";s[r]&&s[r].clusterData&&s[r].clusterData.dir&&(n=s[r].clusterData.dir,a.l.warn("Fixing dir",s[r].clusterData.dir,n));const d=new o.k({multigraph:!0,compound:!0}).setGraph({rankdir:n,nodesep:50,ranksep:50,marginx:8,marginy:8}).setDefaultEdgeLabel((function(){return{}}));a.l.warn("Old graph before copy",i.c(e)),f(r,e,d,r),e.setNode(r,{clusterNode:!0,id:r,clusterData:s[r].clusterData,labelText:s[r].labelText,graph:d}),a.l.warn("New graph after copy node: (",r,")",i.c(d)),a.l.debug("Old graph after copy",i.c(e))}else a.l.warn("Cluster ** ",r," **not meeting the criteria !externalConnections:",!s[r].externalConnections," no parent: ",!e.parent(r)," children ",e.children(r)&&e.children(r).length>0,e.children("D"),t),a.l.debug(s);else a.l.debug("Not a cluster",r,t);n=e.nodes(),a.l.warn("New list of nodes",n);for(const r of n){const n=e.node(r);a.l.warn(" Now next level",r,n),n.clusterNode&&v(n.graph,t+1)}}else a.l.debug("Done, no node has children",e.nodes())},y=(e,t)=>{if(0===t.length)return[];let n=Object.assign(t);return t.forEach((t=>{const r=e.children(t),i=y(e,r);n=[...n,...i]})),n},x={rect:(e,t)=>{a.l.trace("Creating subgraph rect for ",t.id,t);const n=e.insert("g").attr("class","cluster"+(t.class?" "+t.class:"")).attr("id",t.id),r=n.insert("rect",":first-child"),i=n.insert("g").attr("class","cluster-label"),o=i.node().appendChild((0,d.c)(t.labelText,t.labelStyle,void 0,!0));let s=o.getBBox();if((0,a.j)((0,a.g)().flowchart.htmlLabels)){const e=o.children[0],t=(0,l.Ys)(o);s=e.getBoundingClientRect(),t.attr("width",s.width),t.attr("height",s.height)}const c=0*t.padding,h=c/2,g=t.width<=s.width+c?s.width+c:t.width;t.width<=s.width+c?t.diff=(s.width-t.width)/2-t.padding/2:t.diff=-t.padding/2,a.l.trace("Data ",t,JSON.stringify(t)),r.attr("style",t.style).attr("rx",t.rx).attr("ry",t.ry).attr("x",t.x-g/2).attr("y",t.y-t.height/2-h).attr("width",g).attr("height",t.height+c),i.attr("transform","translate("+(t.x-s.width/2)+", "+(t.y-t.height/2)+")");const f=r.node().getBBox();return t.width=f.width,t.height=f.height,t.intersect=function(e){return(0,d.i)(t,e)},n},roundedWithTitle:(e,t)=>{const n=e.insert("g").attr("class",t.classes).attr("id",t.id),r=n.insert("rect",":first-child"),i=n.insert("g").attr("class","cluster-label"),o=n.append("rect"),s=i.node().appendChild((0,d.c)(t.labelText,t.labelStyle,void 0,!0));let c=s.getBBox();if((0,a.j)((0,a.g)().flowchart.htmlLabels)){const e=s.children[0],t=(0,l.Ys)(s);c=e.getBoundingClientRect(),t.attr("width",c.width),t.attr("height",c.height)}c=s.getBBox();const h=0*t.padding,g=h/2,f=t.width<=c.width+t.padding?c.width+t.padding:t.width;t.width<=c.width+t.padding?t.diff=(c.width+0*t.padding-t.width)/2:t.diff=-t.padding/2,r.attr("class","outer").attr("x",t.x-f/2-g).attr("y",t.y-t.height/2-g).attr("width",f+h).attr("height",t.height+h),o.attr("class","inner").attr("x",t.x-f/2-g).attr("y",t.y-t.height/2-g+c.height-1).attr("width",f+h).attr("height",t.height+h-c.height-3),i.attr("transform","translate("+(t.x-c.width/2)+", "+(t.y-t.height/2-t.padding/3+((0,a.j)((0,a.g)().flowchart.htmlLabels)?5:3))+")");const u=r.node().getBBox();return t.height=u.height,t.intersect=function(e){return(0,d.i)(t,e)},n},noteGroup:(e,t)=>{const n=e.insert("g").attr("class","note-cluster").attr("id",t.id),r=n.insert("rect",":first-child"),i=0*t.padding,a=i/2;r.attr("rx",t.rx).attr("ry",t.ry).attr("x",t.x-t.width/2-a).attr("y",t.y-t.height/2-a).attr("width",t.width+i).attr("height",t.height+i).attr("fill","none");const o=r.node().getBBox();return t.width=o.width,t.height=o.height,t.intersect=function(e){return(0,d.i)(t,e)},n},divider:(e,t)=>{const n=e.insert("g").attr("class",t.classes).attr("id",t.id),r=n.insert("rect",":first-child"),i=0*t.padding,a=i/2;r.attr("class","divider").attr("x",t.x-t.width/2-a).attr("y",t.y-t.height/2).attr("width",t.width+i).attr("height",t.height+i);const o=r.node().getBBox();return t.width=o.width,t.height=o.height,t.diff=-t.padding/2,t.intersect=function(e){return(0,d.i)(t,e)},n}};let m={};const b=(e,t,n,o)=>{a.l.info("Graph in recursive render: XXX",i.c(t),o);const l=t.graph().rankdir;a.l.trace("Dir in recursive render - dir:",l);const c=e.insert("g").attr("class","root");t.nodes()?a.l.info("Recursive render XXX",t.nodes()):a.l.info("No nodes found for",t),t.edges().length>0&&a.l.trace("Recursive edges",t.edge(t.edges()[0]));const h=c.insert("g").attr("class","clusters"),g=c.insert("g").attr("class","edgePaths"),f=c.insert("g").attr("class","edgeLabels"),u=c.insert("g").attr("class","nodes");t.nodes().forEach((function(e){const r=t.node(e);if(void 0!==o){const n=JSON.parse(JSON.stringify(o.clusterData));a.l.info("Setting data for cluster XXX (",e,") ",n,o),t.setNode(o.id,n),t.parent(e)||(a.l.trace("Setting parent",e,o.id),t.setParent(e,o.id,n))}if(a.l.info("(Insert) Node XXX"+e+": "+JSON.stringify(t.node(e))),r&&r.clusterNode){a.l.info("Cluster identified",e,r.width,t.node(e));const i=b(u,r.graph,n,t.node(e)),o=i.elem;(0,d.u)(r,o),r.diff=i.diff||0,a.l.info("Node bounds (abc123)",e,r,r.width,r.x,r.y),(0,d.s)(o,r),a.l.warn("Recursive render complete ",o,r)}else t.children(e).length>0?(a.l.info("Cluster - the non recursive path XXX",e,r.id,r,t),a.l.info(w(r.id,t)),s[r.id]={id:w(r.id,t),node:r}):(a.l.info("Node - the non recursive path",e,r.id,r),(0,d.e)(u,t.node(e),l))})),t.edges().forEach((function(e){const n=t.edge(e.v,e.w,e.name);a.l.info("Edge "+e.v+" -> "+e.w+": "+JSON.stringify(e)),a.l.info("Edge "+e.v+" -> "+e.w+": ",e," ",JSON.stringify(t.edge(e))),a.l.info("Fix",s,"ids:",e.v,e.w,"Translateing: ",s[e.v],s[e.w]),(0,d.f)(f,n)})),t.edges().forEach((function(e){a.l.info("Edge "+e.v+" -> "+e.w+": "+JSON.stringify(e))})),a.l.info("#############################################"),a.l.info("###                Layout                 ###"),a.l.info("#############################################"),a.l.info(t),(0,r.bK)(t),a.l.info("Graph after layout:",i.c(t));let p=0;return(e=>y(e,e.children()))(t).forEach((function(e){const n=t.node(e);a.l.info("Position "+e+": "+JSON.stringify(t.node(e))),a.l.info("Position "+e+": ("+n.x,","+n.y,") width: ",n.width," height: ",n.height),n&&n.clusterNode?(0,d.p)(n):t.children(e).length>0?(((e,t)=>{a.l.trace("Inserting cluster");const n=t.shape||"rect";m[t.id]=x[n](e,t)})(h,n),s[n.id].node=n):(0,d.p)(n)})),t.edges().forEach((function(e){const r=t.edge(e);a.l.info("Edge "+e.v+" -> "+e.w+": "+JSON.stringify(r),r);const i=(0,d.g)(g,e,r,s,n,t);(0,d.h)(r,i)})),t.nodes().forEach((function(e){const n=t.node(e);a.l.info(e,n.type,n.diff),"group"===n.type&&(p=n.diff)})),{elem:c,diff:p}},N=(e,t,n,r,o)=>{(0,d.a)(e,n,r,o),(0,d.b)(),(0,d.d)(),m={},c={},h={},s={},a.l.warn("Graph at first:",i.c(t)),((e,t)=>{!e||t>10?a.l.debug("Opting out, no graph "):(a.l.debug("Opting in, graph "),e.nodes().forEach((function(t){e.children(t).length>0&&(a.l.warn("Cluster identified",t," Replacement id in edges: ",w(t,e)),c[t]=u(t,e),s[t]={id:w(t,e),clusterData:e.node(t)})})),e.nodes().forEach((function(t){const n=e.children(t),r=e.edges();n.length>0?(a.l.debug("Cluster identified",t,c),r.forEach((e=>{e.v!==t&&e.w!==t&&g(e.v,t)^g(e.w,t)&&(a.l.warn("Edge: ",e," leaves cluster ",t),a.l.warn("Decendants of XXX ",t,": ",c[t]),s[t].externalConnections=!0)}))):a.l.debug("Not a cluster ",t,c)})),e.edges().forEach((function(t){const n=e.edge(t);a.l.warn("Edge "+t.v+" -> "+t.w+": "+JSON.stringify(t)),a.l.warn("Edge "+t.v+" -> "+t.w+": "+JSON.stringify(e.edge(t)));let r=t.v,i=t.w;if(a.l.warn("Fix XXX",s,"ids:",t.v,t.w,"Translating: ",s[t.v]," --- ",s[t.w]),s[t.v]&&s[t.w]&&s[t.v]===s[t.w]){a.l.warn("Fixing and trixing link to self - removing XXX",t.v,t.w,t.name),a.l.warn("Fixing and trixing - removing XXX",t.v,t.w,t.name),r=p(t.v),i=p(t.w),e.removeEdge(t.v,t.w,t.name);const d=t.w+"---"+t.v;e.setNode(d,{domId:d,id:d,labelStyle:"",labelText:n.label,padding:0,shape:"labelRect",style:""});const o=JSON.parse(JSON.stringify(n)),l=JSON.parse(JSON.stringify(n));o.label="",o.arrowTypeEnd="none",l.label="",o.fromCluster=t.v,l.toCluster=t.v,e.setEdge(r,d,o,t.name+"-cyclic-special"),e.setEdge(d,i,l,t.name+"-cyclic-special")}else(s[t.v]||s[t.w])&&(a.l.warn("Fixing and trixing - removing XXX",t.v,t.w,t.name),r=p(t.v),i=p(t.w),e.removeEdge(t.v,t.w,t.name),r!==t.v&&(n.fromCluster=t.v),i!==t.w&&(n.toCluster=t.w),a.l.warn("Fix Replacing with XXX",r,i,t.name),e.setEdge(r,i,n,t.name))})),a.l.warn("Adjusted Graph",i.c(e)),v(e,0),a.l.trace(s))})(t),a.l.warn("Graph after:",i.c(t)),b(e,t,r)}}}]);
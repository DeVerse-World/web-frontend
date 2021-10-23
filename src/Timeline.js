import 'react-vertical-timeline-component/style.min.css';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';

import React, { useState, useEffect, Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles.css';
import {Card} from 'react-bootstrap/';

function Timeline(props) {
  return (
    <>
      <div className="">
        <h1 className="pb-5 text-center heading">Roadmap</h1>
         <VerticalTimeline>
           <VerticalTimelineElement
             className="vertical-timeline-element--work"
             iconStyle={{ background: '#00FF00', color: '#fff' }}>
             <h3 className="vertical-timeline-element-title">Phase 1</h3>
             <h4 className="vertical-timeline-element-subtitle">The Launch</h4>
             <ul>
               <li>Launch of website</li>
               <li>Token IDO on <a href="https://www.oxbull.tech/#/home" target="_blank">Oxbull</a></li>
               <li>Token listing on Pancake Swap</li>
               <li>Launch of MVP</li>
               <li>Start of marketing and public awareness</li>
             </ul>
           </VerticalTimelineElement>

           <VerticalTimelineElement
             className="vertical-timeline-element--work"
             iconStyle={{ background: '#99ff00', color: '#fff' }}>
             <h3 className="vertical-timeline-element-title">Phase 2</h3>
             <h4 className="vertical-timeline-element-subtitle">Building a playground</h4>
             <ul>
               <li>MVP Iteration
                 <ul>
                   <li>Launch of loot crates</li>
                   <li>Launch of smart NFTs</li>
                   <li>Launch of API</li>
                 </ul>
               </li>
                <li>Research and development</li>
               <li>Team expansion
               </li>
              <li>Further marketing</li>
           </ul>
           </VerticalTimelineElement>

           <VerticalTimelineElement
             className="vertical-timeline-element--work"
             iconStyle={{ background: '#FFFF00', color: '#fff' }}>
             <h3 className="vertical-timeline-element-title">Phase 3</h3>
             <h4 className="vertical-timeline-element-subtitle">Product development</h4>
             <ul>
               <li>Launch of full-fledged smart NFTs</li>
               <li>Introduce oracle-based loot boxes</li>
               <li>Further research and development</li>
               <li>Strategize a marketing and adoption plan</li>
             </ul>
           </VerticalTimelineElement>

           <VerticalTimelineElement
             className="vertical-timeline-element--work"
             iconStyle={{ background: '#ff6600', color: '#fff' }}>
             <h3 className="vertical-timeline-element-title">Phase 4</h3>
             <h4 className="vertical-timeline-element-subtitle">Adoption and expansion</h4>
             <ul>
               <li>Launch of our own simple game that utilizes our NFTs</li>
               <li>Have indie game developers adopt Altura in their video-games</li>
               <li>Further product development and iteration </li>
             </ul>
           </VerticalTimelineElement>

           <VerticalTimelineElement
             className="vertical-timeline-element--work"
             iconStyle={{ background: '#FF0000', color: '#fff' }}>
             <h3 className="vertical-timeline-element-title">Phase 5</h3>
             <h4 className="vertical-timeline-element-subtitle">Further adoption and expansion</h4>
             <ul>
               <li>Have major gaming companies utilize our SDKs and APIs</li>
               <li>Have major gaming companies roll out NFTs on Altura </li>
               <li>Further marketing and expansion</li>
             </ul>
           </VerticalTimelineElement>
         </VerticalTimeline>
      </div>
    </>
  );
}

export default Timeline;

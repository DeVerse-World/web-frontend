import React, { useState, useEffect, Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { IconButton } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LanguageIcon from '@material-ui/icons/Language';
function TeamMembersSection(props) {
  return (
    <section className="container text-center p-4">
      <h1 className="text-6xl font-bold">Our Team</h1>
      <br />
      <div className="row justify-content-around">
        <div className="col-lg-3 col-md-6 p-3 col-12">
          <img className="founder-image team-images mb-3" style={{ width: "100%" }} src="/images/majd.jpg" />
          <h3>Majd Hailat</h3>
          <h5 style={{ fontWeight: "400", color: "#ABABAB" }}>Founder & Lead Developer</h5>
          <p style={{ fontSize: "0.9rem" }}><span style={{ color: "#ABABAB" }}>Majd, an ambitious young entrepreneur, is the developer of <a target="_blank" href="https://www.portfolioview.ca/">Portfolio View
          </a> and the host of the <a target="_blank" href="https://www.youtube.com/channel/UCSI8zjZx3Y-dqCvShs43nyg">Eager Money</a> YouTube channel with 15,000 subscribers. He has been a developer and investor in the cryptocurrency space since 2019</span> </p>
          <IconButton target="_blank" href="https://www.linkedin.com/in/majd-hailat-033389197/" color="primary">
            <LinkedInIcon />
          </IconButton>
          <IconButton target="_blank" href="https://github.com/majd64" color="primary">
            <GitHubIcon />
          </IconButton>
          <IconButton target="_blank" href="https://majdhailat.com/" color="primary">
            <LanguageIcon />
          </IconButton>
          <IconButton target="_blank" href="https://www.youtube.com/channel/UCSI8zjZx3Y-dqCvShs43nyg" color="primary">
            <YouTubeIcon />
          </IconButton>
        </div>

        <div className="col-lg-3 col-md-6 p-3 col-12">
          <img className="founder-image team-images mb-3" style={{ width: "100%" }} src="/images/maxim2.jpeg" />
          <h3>Maxim Sindall</h3>
          <h5 style={{ fontWeight: "400", color: "#ABABAB" }}>Co-Founder & Head of Finance</h5>
          <p style={{ fontSize: "0.9rem" }}><span style={{ color: "#ABABAB" }}>Maxim developed an educational program called 'Understanding Computing' where he helped students grow their knowledge in blockchain and cryptocurrency.
            He also manages private investments.
          </span> </p>
          <IconButton target="_blank" href="https://www.linkedin.com/in/maxim-s-245a86116/" color="primary">
            <LinkedInIcon />
          </IconButton>

          <IconButton target="_blank" href="https://maximsindall.com/" color="primary">
            <LanguageIcon />
          </IconButton>
        </div>

        <div className="col-lg-3 col-md-6 p-3 col-12">
          <img className="mb-3" style={{ width: "100%" }} src="/images/wang.png" />
          <h3>LongHong Wang</h3>
          <h5 style={{ fontWeight: 400, color: "#ABABAB" }}>Blockchain Developer</h5>
          <p style={{ fontSize: "0.9rem" }}><span style={{ color: "#ABABAB" }}>
            LongHong Wang is an experienced senior blockchain developer and software engineer with over 7 years of experience. He is the Lead Developer at <a target="_blank" href="https://chonker.finance/">Chnoker.finance,</a> a developer at Elixer-Swap and at Infraex development.
          </span> </p>
          <IconButton target="_blank" href="https://www.linkedin.com/in/wanglonghong/" color="primary">
            <LinkedInIcon />
          </IconButton>
          <IconButton target="_blank" href="https://github.com/wanglonghong" color="primary">
            <GitHubIcon />
          </IconButton>
        </div>

        <div className="col-lg-3 col-md-6 p-3 col-12">
          <img className="mb-3" style={{ width: "100%" }} src="/images/andrew.png" />
          <h3>Andrew</h3>
          <h5 style={{ fontWeight: 400, color: "#ABABAB" }}>Graphic designer</h5>
          <p style={{ fontSize: "0.9rem" }}><span style={{ color: "#ABABAB" }}>
            Andrew Evanyshyn has over 5 years of experiance in graphic design and is a professioanl in Photoshop, Illustrator, and InDesign.
          </span> </p>
          <IconButton target="_blank" href="https://www.linkedin.com/in/andrew-evanyshyn-a66481211" color="primary">
            <LinkedInIcon />
          </IconButton>
        </div>
      </div>
    </section>
  );
}

export default TeamMembersSection;

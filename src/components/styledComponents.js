// Inspired on: https://github.com/bntzio/gatsby-starter-superstylin/blob/master/components/styled/index.js
import styled, { injectGlobal } from 'styled-components'
import {Grid, Col, Row} from 'react-styled-flexboxgrid'
import * as Bootstrap from 'react-bootstrap';
//import {Navbar, NavBrand, Nav, NavItem, CollapsibleNav} from 'react-bootstrap';

import HeaderComp from '../components/Header'

injectGlobal`
  body {
    margin: 0;
    font-family: sans-serif;
  }
`


// Create a <Wrapper> react component that renders a <section> with
// some padding and a papayawhip background
export const Wrapper = styled(Grid)`
  position:relative;
  width:100vw;
  margin-left: auto;
  margin-right: auto;
  padding-top: 50px;
  @media only screen and (min-width : 1000px) {
    width:1000px;
  }
`;

/*
 ---- HEADER ----
 */

export const Header = styled(HeaderComp)``

export const Navbar = styled(Bootstrap.Navbar)``

export const Logo = styled.img`
    height: 100%;
`

export const NavItem = styled.li`
  border-right: 1px solid #bbb;
  font-size: 14px;
  font-weight: 600;
  cursor:pointer;
`;

/*
 ---- POST OVERVIEW ----
 */

export const PostsSection = styled.section`
  margin: 0 17px;
  @media only screen and (min-width : 480px) {
    margin: 0 0px;
  }
`;

export const PostItem = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
`;

export const PostTitle = styled.div`
  font-size:18px;
  font-weight:600;
`;

export const PostImage = styled.img`
  margin:15px 0;
  @media only screen and (min-width : 320px) {
    width:300px;
  }
  @media only screen and (min-width : 768px) {
    width:500px;
  }
`;

export const PostVotes = styled.div`
  opacity:.7;
  > img {
    width:24px;
    height:24px;
    margin-right:10px;
    padding:7px;
    border:1px solid #aaa;
    border-radius:3px;
  }
`;

export const FacebookButtonCotainer = styled.span`
  padding: 8px 15px;
  display: block;

  > div
   > .loginBtn {
        box-sizing: border-box;
        position: relative;
        /* width: 13em;  - apply for fixed size */
        margin: 0.2em;
        padding: 0 10px 0 40px;
        border: none;
        text-align: left;
        line-height: 28px;
        white-space: nowrap;
        border-radius: 0.2em;
        font-size: 13px;
        color: #FFF;
        cursor: pointer;
      }
      .loginBtn:before {
        content: "";
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        width: 28px;
        height: 100%;
      }
      .loginBtn:focus {
        outline: none;
      }
      .loginBtn:active {
        box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
      }


      /* Facebook */
      .loginBtn--facebook {
        background-color: #4C69BA;
        background-image: linear-gradient(#4C69BA, #3B55A0);
        /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
        text-shadow: 0 -1px 0 #354C8C;
      }
      .loginBtn--facebook:before {
        border-right: #364e92 1px solid;
        background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
        background-size: 16px;
      }
      .loginBtn--facebook:hover,
      .loginBtn--facebook:focus {
        background-color: #5B7BD5;
        background-image: linear-gradient(#5B7BD5, #4864B1);
      }
    }
`;

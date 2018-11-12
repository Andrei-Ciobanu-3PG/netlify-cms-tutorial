import React from "react";
import {graphql, withPrefix} from "gatsby";
import { Link } from 'gatsby';


const ReactMarkdown = require('react-markdown');


function renderOffer(offer) {
    return (
        <div key={offer.offerId} className="col-sm">

            <div className="d-flex flex-column h-100 justify-content-between border">
                <div className="p-2 h-10">
                    <h4>{offer.name}</h4>
                    <h5>{offer.weekDescription}</h5>
                </div>
                <div className="p-2 h-100">
                    <ReactMarkdown source={offer.body}/>
                </div>
                <div className="p-2 h-10">
                    <span className="float-left">{offer.weekDescription}</span>
                    <span className="float-right">{offer.description}</span>
                </div>
                <div className="p-2 h-10">
                    <Link className="btn btn-primary btn-block"
                          to={`/payment?productId=${offer.productId}&offerId=${offer.offerId}&campaignId=645X`}>
                        Start free trial
                    </Link>
                </div>
            </div>

            {/*<div className="card h-100">*/}
                {/*<div className="card-header">*/}
                    {/*<h4>{offer.name}</h4>*/}
                    {/*<h5>{offer.weekDescription}</h5>*/}
                {/*</div>*/}

                {/*<ul className="list-group list-group-flush">*/}
                    {/*<li className="list-group-item">*/}
                        {/*<ReactMarkdown source={offer.body} />*/}
                    {/*</li>*/}
                    {/*<li className="list-group-item">*/}
                        {/*<span className="float-left">{offer.weekDescription}</span>*/}
                        {/*<span className="float-right">{offer.description}</span>*/}
                    {/*</li>*/}
                {/*</ul>*/}
                {/*<div className="card-footer">*/}
                    {/*<Link className="btn btn-primary btn-block" to="/">Start free trial</Link>*/}
                {/*</div>*/}
            {/*</div>*/}
        </div>
    );
}

export default function Template({data}) {
    const {landingPagesJson} = data;
    return (
        <div className="container">
            <div className="row">
                <img className="align-self-center mr-3 col-sm" src={withPrefix(landingPagesJson.banner)} alt="banner"/>
            </div>
            <div className="row">
                <h3 className="col-sm">{landingPagesJson.subtitle}</h3>
            </div>
            <div className="row">
                {landingPagesJson.offers.map(offer => renderOffer(offer))}
            </div>
        </div>
    )
}

export const pageQuery = graphql`
  query($filePath: String!) {
    landingPagesJson(path: { eq: $filePath }) {
        title
        subtitle
        path
        banner
        offers {
          offerId
          productId
          name
          description
          weekDescription
          body
      }
    }
  }
`;

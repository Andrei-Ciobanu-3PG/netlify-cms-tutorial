import React from "react"
import {graphql, withPrefix} from "gatsby"
const ReactMarkdown = require('react-markdown')


function renderOffer(offer) {
    return (
        <div key={offer.offerId} className="col-sm">
            <div className="card">
                <div className="card-header">
                    <h4>{offer.name}</h4>
                    <h5>{offer.weekDescription}</h5>
                </div>
                <div className="card-body">
                    <ReactMarkdown source={offer.body} />
                </div>

                <div className="card-footer container">
                    <div className="row">
                        <div className="col-sm">{offer.weekDescription}</div>
                        <div className="col-sm">{offer.description}</div>
                    </div>
                </div>

            </div>
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
                <h3 className="col-sm">{landingPagesJson.title}</h3>
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
        path
        banner
        offers {
          offerId
          name
          description
          weekDescription
          body
      }
    }
  }
`;

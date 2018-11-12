import React,{Component} from 'react';
import queryString from 'query-string';

class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            product: null
        };
    }

    componentDidMount() {
        const {productId, offerId, campaignId} = queryString.parse(this.props.location.search);

        if(!productId || !offerId) {
            return this.setState({
                isLoaded: true,
                error: new Error('productId and offerId are mandatory')
            });
        }

        fetch(`https://tmg-api-proxy.herokuapp.com/commerce/products/${productId}?offerid=${offerId}&campaignid=${campaignId}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        product: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    render(){
        const { error, isLoaded, product } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div></div>;
        } else {
            return (
                <div className="container">
                    <div className="row border-bottom">The Telegraph</div>
                    <div className="row border-bottom">
                        <div className="col-8">
                            Login
                        </div>
                        <div className="col-4">
                            <div className="card">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><h4 className="card-title">Your Telegraph subscription</h4></li>
                                    <li className="list-group-item">
                                        <div dangerouslySetInnerHTML={{__html: product.description}} />
                                    </li>
                                    <li className="list-group-item">
                                        <div className="text-center"><h4 dangerouslySetInnerHTML={{__html: product.ratePlans[0].offers[0].name}}/></div>
                                        <div className="text-center"><h6 dangerouslySetInnerHTML={{__html: product.ratePlans[0].offers[0].description}}/></div>
                                        <div className="text-center"><h6 dangerouslySetInnerHTML={{__html: product.ratePlans[0].offers[0].subDescription}}/></div>
                                    </li>
                                    <li className="list-group-item">
                                        If you have any questions about your subscription, please email us at digitalservices@telegraph.co.uk or call us on 0800 542 5860 (UK) or 0044 1622 335007 (International)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">Footer</div>
                </div>
            );
        }
    }

}

export default Payment;

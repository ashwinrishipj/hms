import React, { useEffect, useState } from "react"
import { Container, Card, Col, Row, CardGroup, Breadcrumb, Button } from "react-bootstrap";

function Home() {
    const [generalAPI, setgeneralAPI] = useState();
    const [apiReceived, setapiReceived] = useState(false);
    const [newsData, setnewsData] = useState([]);
    const [isCountrySuggestied, setisCountrySuggested] = useState(false);
    const [countrySuggestions, setcountrySuggestions] = useState([]);
    const [defaultCountryValue, setdefaultCountryValue] = useState("");

    const fetchNews = () => {
        fetch("https://bing-news-search1.p.rapidapi.com/news?safeSearch=Strict&textFormat=Raw", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
                "x-rapidapi-key": "9c0b8ec9f2msh082db76641e74e1p195d92jsn0d30e44fb4d2",
                "x-bingapis-sdk": "true"
            }
        })
            .then(response => {
                return response.json()
            }).then(responseData => {
                console.log("response", responseData.value);
                localStorage.setItem('news', JSON.stringify(responseData.value));
                setnewsData(responseData.value);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const fetchCountryList = () => {
        fetch(`https://rapidapi.p.rapidapi.com/countries`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": "9c0b8ec9f2msh082db76641e74e1p195d92jsn0d30e44fb4d2"
            }
        })
            .then(res => {
                return res.json()
            }).then((response) => {
                localStorage.setItem('countryList', JSON.stringify(response.response))
                setcountrySuggestions(true);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const fetchCovidData = (country = "Canada") => {
        fetch(`https://rapidapi.p.rapidapi.com/statistics?country=${country}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": "9c0b8ec9f2msh082db76641e74e1p195d92jsn0d30e44fb4d2"
            }
        })
            .then(res => {
                return res.json()
            }).then((response) => {
                localStorage.setItem('covid-basics', JSON.stringify(response));
                setgeneralAPI(response);
                setapiReceived(true);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const getCountrySuggestionList = (e) => {
        var countryList = JSON.parse(localStorage.getItem('countryList'));
        var countrySuggestionsList = countryList.filter(countrySuggestion => {
            return countrySuggestion.toLowerCase().includes(e.target.value.toLowerCase());
        });

        setcountrySuggestions(countrySuggestionsList);
        setisCountrySuggested(true);
        setdefaultCountryValue(e.target.value);
    }

    useEffect(() => {

        if (localStorage.getItem('covid-basics') && (localStorage.getItem('news')) && (localStorage.getItem('countryList'))) {
            setgeneralAPI(JSON.parse(localStorage.getItem('covid-basics')));
            setapiReceived(true);
            setnewsData(JSON.parse(localStorage.getItem('news')));
        }
        else {
            fetchCovidData();
            fetchNews();
            fetchCountryList();
        }
    }, [])

    const selectedCountry = (data) => {
        setcountrySuggestions([]);
        setisCountrySuggested(false);
        fetchCovidData(data);
        setdefaultCountryValue(data);
    }

    return (
        <>
            <Breadcrumb>
            <Breadcrumb.Item active>Home</Breadcrumb.Item>
            </Breadcrumb>
            <Container>
                <Row>
                    <Col lg={8}>
                        <h3>Covid-19 Tracker </h3>
                        <div className="text-center">
                            <input autoComplete="off" className="form-control align-items-center ml-2" value={defaultCountryValue} style={{ width: "30%" }} id="myInput" onChange={(e) => getCountrySuggestionList(e)} type="text" placeholder="Search Country!." />
                            <ul className="list-group scroll-auto home-list" id="myList">
                                {isCountrySuggestied ?
                                    <>
                                        {countrySuggestions.map((data, key) => {
                                            return (
                                                <li key={key} href="return false" style={{ cursor: "pointer" }} onClick={() => selectedCountry(data)} className="list-group-item">{data}</li>
                                            )
                                        })}
                                    </> : ""}
                            </ul>

                        </div>
                        <h3 className="text-danger text-center"> {defaultCountryValue} covid cases </h3>
                        <CardGroup className="ml-4" >
                            <Card className="text-center rounded-border">
                                <Card.Body>
                                    <Card.Text className="font-recovered ">
                                        {apiReceived ? generalAPI.response[0].cases.recovered : ""}
                                    </Card.Text>
                                    <h3>Recovered </h3>
                                </Card.Body>
                            </Card>
                            <Card className="text-center rounded-border ml-3">
                                <Card.Body>
                                    <Card.Text className="font-active">
                                        {apiReceived ? generalAPI.response[0].cases.active : ""}
                                    </Card.Text>
                                    <h3> active</h3>
                                </Card.Body>
                            </Card>
                            <Card className="text-center rounded-border ml-3">
                                <Card.Body>
                                    <Card.Text className="font-deaths">
                                        {apiReceived ? generalAPI.response[0].deaths.total : ""}
                                    </Card.Text>
                                    <h3> deaths</h3>
                                </Card.Body>
                            </Card>
                        </CardGroup>
                        <Card className="text-center rounded-border mx-auto" style={{ width: "50%" }}>
                            <Card.Body>
                                Critical:
                                    <Card.Text className="font-active">
                                    {apiReceived ? generalAPI.response[0].cases.critical : ""}
                                </Card.Text>
                                    Total Affected:
                                    <Card.Text className="font-active">
                                    {apiReceived ? generalAPI.response[0].cases.total : ""}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col style={{ borderLeft: "1px solid black" }} className="scroll-auto h-100">
                        <h5 className="mt-4"> News </h5>
                        <>
                            {newsData.map((data, key) => {
                                return (
                                    <>
                                        <Card
                                            bg={"info"}
                                            text={"white"}
                                            style={{ width: '20rem' }}
                                            className="ml-2 mt-2"
                                            key={key}
                                        >
                                            <Card.Body>
                                                <Card.Title text={"dark"}> {data.name}</Card.Title>
                                                <Card.Text>
                                                    {data.description}
                                                </Card.Text>
                                                <Button variant="outline-warning" className="mt-2" href={newsData[key].url} target="_blank">Read More...</Button>

                                            </Card.Body>
                                        </Card>
                                    </>
                                );
                            })}
                        </>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home;
import Banner from "../components/Banner";
import CreateProposal from "../components/CreateProposal";
import Proposals from "../components/Proposals";
import Header from "../header/Header";

const Home = () => {
    return (
        <>
            <Header />
            <Banner />
            <Proposals />
        </>
    );
};

export default Home;

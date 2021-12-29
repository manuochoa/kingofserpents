import React, { useState, useEffect } from "react";
import { Badge, Button } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ethers } from "ethers";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// IMAGES
import aboutImage from "./assets/images/about-img.png";

// ABOUT IMAGES
import legendary1 from "./assets/images/about/Legendary1.gif";
import legendary2 from "./assets/images/about/Legendary2.gif";
import legendary3 from "./assets/images/about/Legendary3.gif";

// TEAM IMAGES
import founderPfp from "./assets/images/team/founder.gif";
import leadDevPfp from "./assets/images/team/lead-dev.png";
import animatorPfp from "./assets/images/team/animator.png";
import directorPfp from "./assets/images/team/creative-director.png";
import managerPfp from "./assets/images/team/community-manager.png";

function App() {
  const [userAddress, setUserAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    console.log("hola");
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setUserAddress(accounts[0]);

      window.localStorage.setItem("userAddress", accounts[0]);

      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      if (chainId !== "0x4") {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x4" }],
        });
      }

      window.ethereum.on("accountsChanged", function (accounts) {
        setUserAddress(accounts[0]);
      });

      window.ethereum.on("chainChanged", (_chainId) =>
        window.location.reload()
      );
    } catch (error) {
      console.log(error);
    }
  };

  const checkConnection = () => {
    let user = window.localStorage.getItem("userAddress");
    if (user) {
      connectWallet();
    }
  };

  const mint = async () => {
    setIsLoading(true);
    try {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner(0);
      let basiliskMinting = new ethers.Contract(
        "0xbA81E4dEc239e45563299a587B5d6E5aF5f96E86",
        [
          "function publicSaleMint(uint256 _amount) public payable",
          "function preSaleMint(uint256 _amount) public payable",
          "function preSaleStarts() public view returns (uint)",
          "function publicSaleStarts() public view returns (uint)",
        ],
        signer
      );

      let publicSaleTime = await basiliskMinting.publicSaleStarts();
      let receipt;

      if (Date.now() > publicSaleTime * 1000) {
        receipt = await basiliskMinting.publicSaleMint("1", {
          value: ethers.utils.parseUnits("0.05"),
        });
      } else {
        receipt = await basiliskMinting.preSaleMint("1", {
          value: ethers.utils.parseUnits("0.05"),
        });
      }

      console.log(receipt);
    } catch (error) {
      if (error.error.message) {
        window.alert(error.error.message);
      }
      console.log({ error });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const info = [
    { title: "999 Characters", image: legendary1 },
    { title: "Randomly Generated", image: legendary2 },
    { title: "100% rights to holders", image: legendary3 },
  ];

  const teamData = [
    {
      name: 'Shayan "Lord Serpent"',
      role: "Founder/Social Media Marketing",
      twitter: "https://twitter.com/",
      image: founderPfp,
    },
    {
      name: "Ali",
      role: "Lead Developer",
      twitter: "https://twitter.com/",
      image: leadDevPfp,
    },
    {
      name: "Mark",
      role: "Pixel Artist/Animator",
      twitter: "https://twitter.com/",
      image: animatorPfp,
    },
    {
      name: "Cid",
      role: "Creative Director",
      twitter: "https://twitter.com/",
      image: directorPfp,
    },
    {
      name: "Mrs. Kwan",
      role: "Community Manager",
      twitter: "https://twitter.com/",
      image: managerPfp,
    },
  ];

  return (
    <div id="app-content">
      <Header />

      <section id="mint">
        <div className="container position-relative mb-5">
          <div className="overlay"></div>
          <div className="main-section d-flex flex-column justify-content-center align-items-center text-center">
            <h1 className="title pt-0 p-4">
              King Of <br /> Serpentz
            </h1>
            <Button
              disabled={isLoading}
              onClick={userAddress ? () => mint() : () => connectWallet()}
              className="button-primary"
            >
              {isLoading
                ? "Minting..."
                : userAddress
                ? "Mint"
                : "Connect Wallet"}
            </Button>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="container">
          <div className="info-section pt-5 pb-5">
            <div className="row d-flex justify-content-center">
              <div className="col-9">
                <div className="row">
                  {info.map((item, index) => {
                    return (
                      <div key={index} className="col-12 col-lg-6 col-xl-4">
                        <div className="info-card d-flex flex-column align-items-center justify-content-center mb-2 mb-xl-0">
                          <img className="img-fluid" src={item.image} alt="" />
                          <h6 className="mt-2">{item.title}</h6>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="story">
        <div className="container">
          <div className="about-section pt-5 pb-5">
            <div className="row d-flex flex-column justify-content-center align-items-center text-center">
              <div className="position-relative d-flex flex-column align-items-center">
                <div className="overlay"></div>
                <div className="overlay-2"></div>
                <div className="col-9">
                  <img className="img-fluid" src={aboutImage} alt="" />
                </div>
              </div>
              <div className="col-9">
                <h1 className="section-title">The Story</h1>
                <p className="mt-5">
                  It was the year 900 A.C. (After Cyberkongz), a violent tremble
                  through the waters had awoken the Serpentz from what was
                  supposed to be an eternal slumber. They woke in the middle of
                  nowhere, & started to migrate to the lands where they could
                  take their throne. They moved from the deep, dark oceans, to
                  the light & pacific waters.
                </p>
                <p>
                  They kept going with no sign of the lands, until one day they
                  came upon an island. But something was wrong, the islands were
                  now abandoned, left empty with nothing, a ghost town. So, the
                  Serpentz continued on their path. The pack was starting to
                  give up, when finally they saw something they had never
                  witnessed. They had come across land, but it was polluted,
                  with smoke, & with buildings the size of themselves. There
                  were creatures all throughout the land, they looked something
                  like naked apes.
                </p>
                <p>
                  The Serpentz couldn’t rule this land, as it was not the
                  ancient lands they were looking for. One Serpent came up with
                  a wonderful idea, to conquer the waters. That is exactly what
                  they did. They moved forward, & became the King Of Serpentz,
                  serpents from all over migrated to the waters, the ones in
                  holes on the abandoned islands, & the ones from cages in the
                  cities. Things were finally how they were meant to be.....
                  Until, a proud group of warriors burned down the cities, took
                  over, and made it mandatory to chase Serpentz so they could
                  fulfill the prophecy of their ancestors. That is when the war
                  truly began. Will you fight with them, or against them? The
                  choice is yours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*<section>*/}
      {/*    <div className="container">*/}
      {/*        <div className="clan-section pt-5 pb-5">*/}
      {/*            <div className="row d-flex justify-content-center align-items-center">*/}
      {/*                <div className="col-9">*/}
      {/*                    <div className="row">*/}
      {/*                        */}
      {/*                        <div className="col-12">*/}
      {/*                            <h1 className="section-title">Find Your Clan</h1>*/}
      {/*                            <h6 className="mt-4">TYPE: Y0K-A1</h6>*/}
      {/*                            <h6><Badge className="badge-1">Ghost Spirit (Common)</Badge></h6>*/}
      {/*                            <p className="pt-2 pb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>*/}
      {/*                        </div>*/}
      {/*                        <div className="col-4">*/}
      {/*                            <div className="info-card">*/}
      {/*                                <img className="img-fluid" src={clanImage} alt="" />*/}
      {/*                                <h6 className="mt-4">POPULATION: 5,278 (68%)</h6>*/}
      {/*                                <p>Y0K-A1 thrive on color and simplicity. They vibe with a clean lo-fi style with a variety of outfits and accessories.</p>*/}
      {/*                            </div>*/}
      {/*                        </div>*/}
      {/*                        <div className="col-4">*/}
      {/*                            <div className="info-card">*/}
      {/*                                <img className="img-fluid" src={clanImage} alt="" />*/}
      {/*                                <h6 className="mt-4">Common Traits</h6>*/}
      {/*                                <p>*/}
      {/*                                    Bandaid, <br/>*/}
      {/*                                    Kitsune (Pearl) <br/>*/}
      {/*                                    Various Headphones*/}
      {/*                                </p>*/}
      {/*                                <p>*/}
      {/*                                    Backgrounds: <br/>*/}
      {/*                                    Citrine, Azurite, & Jasper*/}
      {/*                                </p>*/}
      {/*                            </div>*/}
      {/*                        </div>*/}
      {/*                        <div className="col-4">*/}
      {/*                            <div className="info-card">*/}
      {/*                                <img className="img-fluid" src={clanImage} alt="" />*/}
      {/*                                <h6 className="mt-4">Rare Traits</h6>*/}
      {/*                                <p>*/}
      {/*                                    Cat Ears <br/>*/}
      {/*                                    Gasmask <br/>*/}
      {/*                                    Kitsune (Obsidian)*/}
      {/*                                </p>*/}
      {/*                                <p>*/}
      {/*                                    Cat Accessories: <br/>*/}
      {/*                                    Loop Earring*/}
      {/*                                </p>*/}
      {/*                            </div>*/}
      {/*                        </div>*/}

      {/*                        <div className="col-12 mt-5">*/}
      {/*                            <h6 className="mt-4">TYPE: B4K3M0-N0</h6>*/}
      {/*                            <h6><Badge className="badge-1 badge-secondary-color">Monster Form (UnCommon)</Badge></h6>*/}
      {/*                            <p className="pt-2 pb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>*/}
      {/*                        </div>*/}
      {/*                        <div className="col-4">*/}
      {/*                            <div className="info-card">*/}
      {/*                                <img className="img-fluid" src={clanImage} alt="" />*/}
      {/*                                <h6 className="mt-4">POPULATION: 5,278 (68%)</h6>*/}
      {/*                                <p>Y0K-A1 thrive on color and simplicity. They vibe with a clean lo-fi style with a variety of outfits and accessories.</p>*/}
      {/*                            </div>*/}
      {/*                        </div>*/}
      {/*                        <div className="col-4">*/}
      {/*                            <div className="info-card">*/}
      {/*                                <img className="img-fluid" src={clanImage} alt="" />*/}
      {/*                                <h6 className="mt-4">Common Traits</h6>*/}
      {/*                                <p>*/}
      {/*                                    Bandaid, <br/>*/}
      {/*                                    Kitsune (Pearl) <br/>*/}
      {/*                                    Various Headphones*/}
      {/*                                </p>*/}
      {/*                                <p>*/}
      {/*                                    Backgrounds: <br/>*/}
      {/*                                    Citrine, Azurite, & Jasper*/}
      {/*                                </p>*/}
      {/*                            </div>*/}
      {/*                        </div>*/}
      {/*                        <div className="col-4">*/}
      {/*                            <div className="info-card">*/}
      {/*                                <img className="img-fluid" src={clanImage} alt="" />*/}
      {/*                                <h6 className="mt-4">Rare Traits</h6>*/}
      {/*                                <p>*/}
      {/*                                    Cat Ears <br/>*/}
      {/*                                    Gasmask <br/>*/}
      {/*                                    Kitsune (Obsidian)*/}
      {/*                                </p>*/}
      {/*                                <p>*/}
      {/*                                    Cat Accessories: <br/>*/}
      {/*                                    Loop Earring*/}
      {/*                                </p>*/}
      {/*                            </div>*/}
      {/*                        </div>*/}

      {/*                    </div>*/}
      {/*                </div>*/}
      {/*            </div>*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*</section>*/}

      <section id="roadmap">
        <div className="container">
          <div className="roadmap-section pt-5 pb-5 mt-5 mb-5">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-9">
                <div className="row">
                  <div className="col-12">
                    <h1 className="section-title mb-5">Roadmap</h1>
                  </div>
                  <div className="col-12">
                    <div className="phase">
                      <h5 className="text-uppercase">Phase - 01</h5>
                      <p>
                        Giveaway as many WL spots as possible to those that are
                        active, & helping grow the community.
                      </p>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="phase pt-5">
                      <h5 className="text-uppercase">Phase - 02</h5>
                      <p>KOS will be launched on the Ethereum blockchain.</p>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="phase pt-5">
                      <h5 className="text-uppercase">Phase - 03</h5>
                      <p>
                        Holders have 100% of the monetization rights/own the IP
                        to their serpent, meaning they will have the ability to
                        do whatever they want with them.
                      </p>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="phase pt-5">
                      <h5 className="text-uppercase">Phase - 04</h5>
                      <p>
                        Focused on creating one of the strongest communities in
                        the NFT space. KOS Discord will be a cross roads for
                        many things. We want to make the KOS Discord a safe
                        space to just kick back, & also a place you come to get
                        all the newest alpha on NFT’s, crypto gaming, defi, &
                        even stocks.
                      </p>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="phase pt-5">
                      <h5 className="text-uppercase">Phase - 05</h5>
                      <p>
                        p2e game “Humans Vs. Serpentz” currently in development.
                        Holders will earn $HISS token for playing and winning
                        games.
                      </p>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="phase pt-5">
                      <h5 className="text-uppercase">Phase - 06</h5>
                      <p>
                        KOS launchpad, holders will have early access to the
                        newest, and hottest upcoming IDO's/mints from projects
                        we collaborate with.
                      </p>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="phase pt-5">
                      <h5 className="text-uppercase">Phase - 07</h5>
                      <p>
                        Holders will also have voting power on what we do with
                        the brand. We are not making decisions on our own.
                        Members hold weight. Every collaboration planned, or
                        project holders get early access to, members will have a
                        say on what happens with these sort of things.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team">
        <div className="container">
          <div className="team-section pt-5 pb-5">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-9">
                <div className="row">
                  <div className="col-12">
                    <h1 className="section-title">The Team</h1>
                    <p className="mt-4">
                      A name has been taken... and the team behind the King Of
                      Serpentz..
                    </p>
                  </div>
                  {teamData.map((item, index) => {
                    return (
                      <div key={index} className="col-12 col-lg-6 col-xl-4">
                        <div className="info-card mt-4 mb-2 mb-xl-0">
                          <img className="img-fluid" src={item.image} alt="" />
                          <h6 className="mt-4">{item.name}</h6>
                          <div className="d-flex justify-content-between">
                            <Badge className="team-badge">{item.role}</Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="community-section position-relative pt-5 pb-5 mt-5 mb-5">
          <div className="overlay"></div>
          <div className="overlay-2"></div>
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center pt-5 pb-5 mt-5 mb-5">
              <div className="col-9">
                <div className="community-card text-center mt-5 mb-5 p-4 p-md-5">
                  <h1 className="mt-4 mb-4 mb-md-5">Join Our Community</h1>
                  <Button
                    className="button-primary mb-4"
                    href="https://discord.gg/km87hWACy2"
                    target="_blank"
                  >
                    Join the Discord
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;

import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    HStack,
    Image,
    Img,
    Input,
    Text,
    Textarea,
    VStack,
  } from "@chakra-ui/react";
  import React, { useEffect, useRef, useState } from "react";
  import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillLinkedin,
    AiFillTwitterSquare,
  } from "react-icons/ai";
  import { RxCaretRight, RxCross1, RxHamburgerMenu } from "react-icons/rx";
  import { Link, NavLink, useNavigate } from "react-router-dom";
  import ContactButton from "../../Components/ContactButton";
import { Footer } from "../../Components/Footer";
import { NavBar } from "../../Components/Navbar";
  const navHoverStyle = {
    background: "brand.700",
    color: "#fff",
    transform: " skewX(-10deg)",
    borderBottomRightRadius: "10px",
    borderTopLeftRadius: "10px",
  };
  const navStyle = {
    fontSize: "16px",
    fontWeight: "500",
    padding: "10px",
    transition: "all 0.3s",
    cursor: "pointer",
  };
  const TermsAndConditions = () => {
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);
    const showMobileMenu = () => {
      setOpenMenu(!openMenu);
    };
    const howItWorks = useRef(null);
    const about = useRef(null);
    const faq = useRef(null);
    const scrollToSection = (elementRef) => {
      window.scrollTo({
        top: elementRef.current.offsetTop,
        behavior: "smooth",
      });
    };
  
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
    return (
      <VStack width={"full"} background={"#FAFCFF"} pt={[0, 0, "0px", "0px"]}>
        <ContactButton/>
        <NavBar/>
        <Box
          width={"full"}
          position={"relative"}
          px={[0, 0, "20px"]}
          py={"20px"}
          bg={"#EDFAFD"}
          margin={0}
        >
          <Container
            mb={"40px"}
            maxWidth={["full", "full", "80%", "80%"]}
            position={"relative"}
          >
            <VStack width={"full"} alignContent={"flex-start"} gap={"30px"}>
              <VStack width={"full"} alignContent={"flex-start"} gap={"10px"}>
                <Text fontSize={["lg", "xl"]} fontWeight={"bold"}>
                Terms And Conditions
                </Text>
                <VStack width={"full"}>
                <PrivacySection>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        ACCEPTANCE OF TERMS AND CONDITIONS
      </Text>
      <Text>
        We appreciate your coming to Bitgifty.com. You ("User", "user", "You" or "you") consent to the Terms of Service (these "Terms") by visiting, accessing, or using Bitgifty.com and related application program interfaces or mobile applications (the "Website" or "Site"). Please read them carefully as you agree that you have read, understand, and accept all of the terms and conditions, including our <Link color="blue.500">Privacy Policy</Link>, <Link color="blue.500">Cookie Policy</Link>, and <Link color="blue.500">Prohibited Use Policy</Link>. To utilize some Additional Services, you might need to accept additional terms and conditions (if any). For the avoidance of doubt, Bitgifty does not offer investment, tax, or legal advice, and you are solely responsible for determining whether any investment, investment strategy, or associated transaction is suitable for you. No Investment Advice or Intermediary: For the avoidance of doubt, Bitgifty does not provide investment, tax, or legal advice. You are solely responsible for determining whether any investment, investment strategy, or related transaction is appropriate based on your personal investment objectives, financial situation, and risk appetite. Bitgifty may provide educational information regarding supported Digital Assets and Digital Assets not supported by Bitgifty to enable users to learn more about such Digital Assets. Information includes, but is not limited to, blog posts, articles, links to third-party content, news feeds, tutorials, and videos. Information provided on the Bitgifty website or any such third-party website does not constitute investment, financial, trading, or other advice, and the content of the website should not be treated. Bitgifty does not endorse the purchase, acquisition, sale, or possession of digital assets. Bitgifty is not responsible for decisions to buy, sell, or retain Digital Assets based on information provided by Bitgifty. The Terms constitute the agreement and understanding regarding the use of any or all of the Services, and any manner of accessing them, between you and the following service providers (“Bitgifty”, “we,” “us” or “our”).
      </Text>
      
      <Text mt={4} fontWeight="bold">
        1. INTRODUCTION
      </Text>
      <Text>
        By clicking on the "Create Account" button or by visiting the Website, we may provide you with access and utility through our trading platform via software, API (application program interface), technologies, products, and/or functionalities. As described in these Terms, you agree to be legally bound by these Terms and all terms incorporated by reference. If you do not agree to be bound by these Terms, do not access or use the Services. We reserve the right to change or modify the terms and conditions contained in the Terms, including but not limited to any policy or guideline of the platform, at any time and at our sole discretion. We will provide notice of these changes by posting the revised Terms and changing the "Last Revised" date at the top of the Terms, or by emailing users at their provided email addresses, or by any other means as determined by us at our sole discretion. Any changes or modifications will be effective immediately upon posting the revisions to the Website or at the instant that we transmit the information. These changes will apply at that instant to all then current and subsequent uses or Services. You waive any right you may have to receive specific notice of such changes or modifications. Your continued use of this platform acts as acceptance of such changes or modifications. If you do not agree to the Terms in effect when you access or use the platform, you must stop using our Services. We encourage you to frequently review the Terms to ensure that you understand the terms and conditions that apply to your access to, and use of, the Services. If you have any questions regarding the use of the Website, please contact <Link color="blue.500">contact@Bitgifty.com</Link>. The Terms and any terms expressly incorporated herein apply to your access to, and use of, any services provided by us. The Terms take precedence over and do not alter in any way the terms or conditions of any other agreement you may have with us for products, services or otherwise. You must carefully read all documents referred to in the Terms including the Terms themselves. You should talk to us and get the appropriate explanation if there is anything in the Terms or other document referenced to here that you do not understand. Any formal communication with you will be undertaken through electronic mail unless otherwise instructed. Documents will be sent to you by electronic mail and you should seek to send any documents to us by the same means. Any formal communication with you will, unless otherwise agreed, be made in the English language. In the event of any discrepancy between the English language version of the Terms or any such communications and any translation of the Terms or such communications (as applicable) in a foreign language, the respective English version shall prevail.
      </Text>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
       2. ELIGIBILITY AND PROHIBITION OF USING OUR SERVICES & BUSINESS
      </Text>
      <Text>
        The Services are intended solely for users who represent and warrant that (i) you are at least 18 or are of legal age to form a binding contract under applicable laws; (ii) you have full legal capacity and sufficient authorizations to enter into these Terms; (iii) you have not been previously suspended or removed from using the Bitgifty Services; (iv) you do not have an existing Bitgifty Account; (v) you are not resident, located in or otherwise attempting to access the Services from, or otherwise acting on behalf of a person or legal entity that is resident or located in, a Restricted Location; (vi) if you act as an employee or agent of a legal entity, and enter into these Terms on their behalf, you represent and warrant that you have all the necessary rights and authorizations to bind such legal entity and to access and use the Services on behalf of such legal entity; and (vii) your use of the Services will not violate any and all laws and regulations applicable to you or the legal entity on whose behalf you are acting, including but not limited to regulations on anti-money laundering, anti-corruption, and counter-terrorist financing.
      </Text>
      <Text mt={4}>
        Note that we may not make all of the Services available in all markets and jurisdictions, and may restrict or prohibit use of all or a portion of the Services from Restricted Locations, such as: Cuba, Iran, North Korea, Crimea, Syria, Donetsk, Luhansk. The content of the Terms shall not be excluded from the laws of the country or region under which the user belongs. As a result, if you do not meet these eligibility requirements, do not use our Services.
      </Text>
      <Text mt={4} fontWeight="bold">
       3. PROHIBITED BUSINESSES
      </Text>
      <Text>
        1. We retain the right to always keep an eye on your transactions or accounts that are connected to any of the following Prohibited Businesses, and any usage of our Services in conjunction with any of these types of endeavors is forbidden ("Prohibited Businesses"):</Text>
        <ul>
          <li>unlicensed money service businesses, including but not limited to payment services providers, any money transmitter activities;</li>
          <li>prohibiting any business relationships with banks or financial institutions that do not maintain a physical presence in any country (i.e., a prohibited “Shell Bank'') or that have financial activities or services that do not comply with any laws, regulations, or other legal authority applicable to us or applicable to the regulated financial services or activities in question;</li>
          <li>adult content and services, including but not limited to any types of pornography and other obscene materials (including literature, imagery and other media), sites offering any sexually-related services such as prostitution, escorts, pay-per view, and adult live chat features;</li>
          <li>deceptive marketing and false advertising services;</li>
          <li>religious and/or spiritual organizations;</li>
          <li>unlicensed sale of weapons of any kind, including but not limited to firearms, ammunition, knives, explosives, or related accessories;</li>
          <li>other certain regulated products and services;</li>
          <li>pseudo-pharmaceuticals - companies manufacturing and or selling untested or unapproved pharmaceuticals;</li>
          <li>drugs and drug paraphernalia, including but not limited to, sale of narcotics, controlled substances, and any equipment designed for making or using drugs;</li>
          <li>gambling activities, including but not limited to sports betting, casino games, horse racing, dog racing, lotteries, games of chance, sweepstakes, games of skill that may be classified as gambling (i.e. poker), or other activities that facilitate any of the foregoing;</li>
          <li>money-laundering, fraud, terrorist financing, or any other type of financial crimes;</li>
          <li>any sort of Ponzi scheme, pyramid scheme, or multi-level marketing program;</li>
          <li>goods or services that infringe or violate any copyright, trademark, or proprietary rights under the laws of any jurisdiction;</li>
          <li>layaway systems, or annuities;</li>
          <li>counterfeit or unauthorized goods, including but not limited to the sale or resale of fake IDs and the sale of goods or services that are illegally imported or exported or which are stolen;</li>
          <li>wash trading, front-running, insider trading, market manipulation or other forms of market-based fraud or deceit;</li>
          <li>purchasing goods of any type from hidden service markets or “Darknet” markets, or any other service or website that acts as a marketplace for illegal goods;</li>
          <li>any other unlawful activities which would, in our sole discretion, violate, or assist in violation of, any law, statute, ordinance, or regulation, sanctions programs administered in the countries where we conduct business, or which would involve proceeds of any unlawful activities;</li>
          <li>Shell Banks or financial institutions that have customers that are Shell Banks;</li>
          <li>entities with bearer share ownership;</li>
          <li>defense industry, firearms & munitions manufacturers;</li>
          <li>nuclear energy;</li>
          <li>restricted financial services, including but not limited to credit repair, debt settlement, refinance, bail bonds, collections agencies; or</li>
          <li>transactions or business involving ivory and protected species, blood diamonds.</li>
        </ul>
        <Text>2. In the event that we learn or reasonably suspect, in our sole discretion, that your account is or may be associated with any of the Prohibited Businesses as set forth above, we will consider it to be a violation of these Terms and may suspend or terminate your account, and/or block transactions or freeze your funds immediately without notice, and we reserve the right to report any such suspected or actual Prohibited Businesses to the law enforcement authorities.</Text>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
        4. DESCRIPTION OF OUR SERVICES
      </Text>
      <Text>
        We provide an online trading platform to trade Digital Assets (“Digital Assets” known as virtual financial assets, cryptographic tokens, digital tokens and/or cryptographic currency) and derivatives linked to Digital Assets or indices thereof. Buyers and sellers conduct trading on our platform with each other. In general, we as the platform provider are not a buyer or seller in these transactions. Users may request the withdrawal of their Digital Assets, subject to the limitations as stated in the Terms. Users will be able to access their Digital Assets in their wallets, which are held and safely kept by us.
      </Text>
      <Text mt={4}>
        We provide the User with trading services including:
      </Text>
      <ul>
        <li>
          an order matching platform that automatically, and according to pre-established criteria, matches Users’ trades with open orders from other Users in respect of Digital Assets or Digital Asset linked products;
        </li>
        <li>
          Spot Services that permit you to trade one type of Digital Asset for another type of Digital Asset with another User through an order-matching engine. You will not be able to predetermine or undertake a trade with a predetermined user. Similarly, an order may be partially filled or may be filled by multiple matching orders arising from different users;
        </li>
        <li>
          Additional Services that permit you to trade derivative products linked to Digital Assets or indices composed of them with other users. These trades are via an order matching platform that automatically, and according to pre-established criteria, matches users’ trades with open orders from other users. You will not be able to predetermine or undertake a trade with a pre-determined user.
        </li>
      </ul>
      <Text mt={4}>
        Other additional services include, but are not limited to:
      </Text>
      <ul>
        <li>
          P2P – a Peer to Peer matching service, allowing users to exchange their Fiat Currency and Digital Assets with each other. Users are able to buy and sell Digital Assets from each other without the need of a centralized trusted third party such as an exchange;
        </li>
        <li>
          Margin Lending – a lending service allowing users to borrow/lend Digital Assets to one another and earn rewards; and
        </li>
        <li>
          Digital Wallet – a digital wallet, maintained by us on each user’s behalf, enabling each user to store any Digital Assets that are traded via the exchange services, or any P2P Digital Assets that are deposited or acquired by you through the P2P platform which allows users to buy and sell digital assets directly between users, not directly with Bitgifty.
        </li>
      </ul>
      <Text mt={4}>
        4. You represent and warrant that you are the ultimate and effective legal and beneficial owner of any Digital Assets transferred to your account or wallet on the Website, that you shall not act as nominee or trustee for any other person and that you shall not transfer, assign, pledge, charge or otherwise create any security interest or encumbrance whatsoever over such Digital Assets.
      </Text>
      <Text mt={4}>
        5. While we have made every effort to ensure the accuracy of the information on our Website, the information and content on the Website is subject to change without notice and is provided for the sole purpose of assisting users to make independent decisions. We have taken reasonable measures to ensure the accuracy of the information on the Website; however, we do not guarantee the accuracy, suitability, reliability, completeness, performance and/or fitness for purpose of the content of any Services or products available through the Website, and will not accept liability for any loss or damage that may arise directly or indirectly from the content or your inability to access the Website, for any delay in or failure of the transmission or the receipt of any instruction or notifications sent through our platform. We will not have any liability for the use or interpretation of such information.
      </Text>
      <Text mt={4}>
        6. While using the Services, you accept the information services provided by us. You hereby authorize us to send commercial information to you via email, SMS, mobile notification, or mailing address.
      </Text>
      <Text mt={4}>
        7. You acknowledge and consent that the Services are provided by us according to their current technological capacity and other conditions. While we have made every effort to ensure continuity and security of the Services, we are unable to completely foresee and hedge legal, technological and other risks including but not limited to force majeure, virus, hacker attack, system instability, flaws in third-party services, acts of government, or government agency etc. that may result in service interruption, data loss and other losses and risks.
      </Text>
      <Text mt={4}>
        8. When the Bitgifty Platform is unable to operate properly because of the following circumstances and the user is unable to access the Services or place or cancel an order, we assume no liability for damages. These circumstances include, but are not limited to:
      </Text>
      <ul>
        <li>system downtime during maintenance as announced by the Bitgifty Platform;</li>
        <li>telecom or networking equipment issues;</li>
        <li>typhoon, earthquake, tsunami, flood, power failure, war, terrorist attacks, and other force majeure factors;</li>
        <li>any other issues, including hacker attacks, computer virus intrusion or attack, Website or backend maintenance and upgrade, banking related issues, government regulation or mandates, freezing order imposed by any Competent Authority and any other third party issues; and</li>
        <li>damages to users or other third parties caused by third parties.</li>
      </ul>
      <Text mt={4}>
        9. In relation to the Services provided by Bitgifty:
      </Text>
      <ul>
        <li>
          we reserve the right to process, cancel, correct, clawback, and/or reverse, any Digital Asset transaction or transfers or cancel abnormal transaction results in our sole discretion, even after funds may have been debited from your account(s) upon the occurrence of abnormal transactions, market interruption and other abnormal conditions caused by , arising from, or related to system failure, platform system bug(s), network failure, distributed denial of service attacks (DDos) and other hacker attacks and other unexpected factors; or in response to a subpoena, court order, or other government order; or if we suspect the transaction may: involve money laundering, terrorist financing, fraud, or any other type of financial crime; be erroneous; or relate to a prohibited use in accordance with these Terms. We reserve the right to rollback all the transactions of a certain period of time as described in the respective user agreement. In such instances, Bitgifty will reverse the transaction and debit the corresponding Digital Assets from your account(s) to recover the Losses arising from such transaction, and we are under no obligation to reinstate any purchase or sale order at the same price or on the same terms as the canceled transaction; and/or
        </li>
        <li>
          we strictly prohibit unfair trading behaviors. Bitgifty reserves the right to enact, under its sole discretion, and take control over your account, if you:
        </li>
      </ul>
      <Text mt={4}>
        10. We shall not ask for any password or private keys from our users, nor shall we ask users to transmit any funds or Digital Assets, as applicable. Accordingly, we shall not be responsible for any losses caused by your transmittal of funds or Digital Assets, as applicable.
      </Text>
      <Text mt={4}>
        11. Users acknowledge that we may delist any Digital Asset from the Bitgifty Platform at our sole discretion.
      </Text>
      <Text mt={4}>
        12. With regard to abnormal transaction handling, while using the Services, you agree to and acknowledge the possibility of discontinuity and disruption of the Services due to connectivity problems of the Digital Asset networks or other force majeure. Users shall make sure to provide only correct information. We do not assume any responsibility for any losses caused by the aforementioned situations due to you providing incorrect information that results in our inability to reach out and to explain to you the handling procedures.
      </Text>
      <Text mt={4}>
        13. We have the right to know the purpose and background of the users who use our products or services. Users should provide comprehensive and accurate information as required. If we have reasonable grounds to suspect that the User has provided false information, we are entitled to restrict the User from the use of some or all of Services temporarily or permanently.
      </Text>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        5. TRADING ON BITGIFTY
      </Text>
      <Text>
        A User may buy or sell a Digital Asset by placing an instruction on the Bitgifty Platform (an “Order”) in one (1) Digital Asset into another Digital Asset.
      </Text>
      <Text>
        Users shall verify all transaction information prior to submitting an Order. Users acknowledge and agree that it is the sole responsibility of the User to ensure the validity and accuracy of an Order, including the details of the recipient of any Assets. Bitgifty shall not be liable for the consequences of the User not providing valid and accurate information when placing an Order.
      </Text>
      <Text>
        The Bitgifty Platform is accessible twenty-four (24) hours a day, seven (7) days a week and three hundred and sixty-five (365) days a year, except for any period during which scheduled maintenance or upgrades are being carried out, or in the event that the Bitgifty Platform encounters an interruption or outage that is unexpected or beyond its control.
      </Text>
      <Text>
        Bitgifty may, at its sole discretion and without prior notice close a User’s Account, or suspend a User’s access or use of the Bitgifty Platform or the Services, refuse any Order submitted, or impose limits on trading amounts on the Bitgifty Platform, if Bitgifty deems that a User may have contravened applicable rules, term and regulations.
      </Text>
      <Text>
        A User may only place an Order using the Bitgifty Platform if the User’s Account contains sufficient Assets to cover the Order and any associated fees. If the Account does not contain sufficient Assets to complete an Order on the Bitgifty Platform, the User will not be able to complete such Order on the Bitgifty Platform. When a User places an Order, that quantity of the relevant Asset (including any applicable Fees) is placed on hold in the Account until the Order fills, expires, or is canceled. Any unfilled portion of an Order will remain on hold until it fills, expires, or is canceled.
      </Text>
      <Text>
        A User may withdraw or cancel an Order after it is submitted, as long as such Order has not been executed pending confirmation by the relevant Digital Asset network. Digital Assets which are the subject of a pending Trade shall not be reflected in a User’s Account, and shall therefore not be available for the User to trade. Users understand and agree that:
      </Text>
      <ul>
        <li>Trades are irreversible once Orders are executed; and</li>
        <li>while Bitgifty may, at its sole discretion, reverse a Trade under certain extraordinary conditions (including but not limited to breaches of the Applicable Laws and Regulations or Financial Crime), a User does not have a right to a reversal of a Trade.</li>
      </ul>
      <Text>
        The transaction history provided on the Bitgifty Platform is the true and accurate record of a User’s transactions. It is a User’s responsibility to remain up to date on its transaction history and any Notices with respect to the User’s Account.
      </Text>
      <Text>
        Users understand and agree that there may be a delay in executing a Trade on the BitgiftyPlatform as a result of Bitgifty’s secure trading protocols which require Digital Asset private keys to be stored securely using a combination of online and offline storage for added security.
      </Text>
      <Text fontSize="lg" fontWeight="bold" mt={4}>
        Scheduled downtime
      </Text>
      <Text>
        The User agrees and understands that part of or all of the Services may be periodically unavailable during scheduled maintenance.
      </Text>
      <Text>
        Downtime may be communicated in advance to the User via a Notice published on the Website or by other means.
      </Text>
      <Text fontSize="lg" fontWeight="bold" mt={4}>
        Suspension of Services
      </Text>
      <Text>
        The User acknowledges and agrees that Bitgifty shall have, at Bitgifty’s sole discretion, the right to suspend all or part of the Services, or the User’s access to all or part of the Services, whenever Bitgifty determines in sole discretion that:
      </Text>
      <ul>
        <li>the User may have breached these Terms; or</li>
        <li>the proper functioning of the Bitgifty Platform is in jeopardy.</li>
      </ul>
      <Text>
        For the purposes of Clause 5.13(b), the proper functioning of the Bitgifty Platform will be in jeopardy in the following circumstances:
      </Text>
      <ul>
        <li>when a computer or telecommunications network ceases to operate or function as a result of an accident;</li>
        <li>in the event of a Force Majeure Event which affects the provision of the Services;</li>
        <li>when Bitgifty’s assets or the User’s Assets, or the Bitgifty Platform, are the subject of an attempted or actual malicious attack which may, among other things, result in the theft or loss of such assets;</li>
        <li>when an event affects the proper functioning of critical systems relied upon by the Bitgifty Platform, including the pricing system or any other system necessary for the provision of the Services;</li>
        <li>when Bitgifty suspects unauthorized use of the Bitgifty Platform, or a breach of these Terms or Applicable Laws and Regulations;</li>
        <li>when Bitgifty determines that it is necessary, in its sole discretion, to conduct investigations in light of its requirements under Applicable Laws and Regulations or to ensure the proper functioning of the Bitgifty Platform;</li>
        <li>when for any other reason, Bitgifty determines in its sole discretion that the suspension is necessary.</li>
      </ul>
    </PrivacySection>
  
                </VStack>
              </VStack>
            </VStack>
          </Container>
        </Box>
        <Footer/>
      </VStack>
    );
  };
  
  export default TermsAndConditions;
  
   const PrivacySection = (props) => {
    return (
      <VStack
        width={"full"}
        borderBottom={"1px solid grey"}
        alignItems={"flex-start"}
        py={"20px"}
        gap={"20px"}
      >
        {props.children}
      </VStack>
    );
  };
  
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
import { NavBar } from "../../Components/Navbar";
import { Footer } from "../../Components/Footer";
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
  const Aml = () => {
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
                BITGIFTY - AML/KYC Policy
                </Text>
                <VStack width={"full"}>
                  <PrivacySection>
                  <Text fontSize={"3xl"} fontWeight={"bold"}>
                  1. BITGIFTY.COM (“BITGIFTY.COM”) POLICY

                    </Text>
                    <Text>
                    It is the policy of BITGIFTY.COM to prohibit and actively prevent money laundering and any activity 
                    that facilitates money laundering or the financing of terrorist or criminal activities. 
                    We will comply with all applicable requirements and regulations. 
                    Money laundering is generally defined as engaging in acts designed to conceal or disguise the 
                    true origins of criminally derived proceeds so that the proceeds appear to have derived 
                    from legitimate origins or constitute legitimate assets. Generally, money laundering occurs in three stages. 
                    Cash first enters the financial system at the “placement” stage, 
                    where the cash generated from criminal activities is converted into monetary instruments, such as money orders or traveller’s checks, 
                    or deposited into accounts at financial institutions. 
                    </Text>
                    <Text>
                    At the “layering” stage, the funds are transferred or moved into other accounts or other financial institutions to further separate the money from its criminal origin. At the “integration” stage, the funds are reintroduced into the economy and used to purchase legitimate assets or to fund other criminal activities or legitimate businesses. Terrorist financing may not involve the proceeds of criminal conduct, but rather an attempt to conceal either the origin of the funds or their intended use, which could be for criminal purposes. Legitimate sources of funds are a key difference between terrorist financiers and traditional criminal organisations.
                    </Text>
                    <Text>
                    In addition to charitable donations, legitimate sources include foreign government sponsors, business ownership and personal employment. Although the motivation differs between traditional money launderers and terrorist financiers, the actual methods used to fund terrorist operations can be the same as or similar to methods used by other criminals to launder funds. Funding for terrorist attacks does not always require large sums of money and the associated transactions may not be complex. Our AML/CFT policies, procedures and internal controls are designed to ensure compliance with all applicable regulations and will be reviewed and updated on a regular basis to ensure appropriate policies, procedures and internal controls are in place to account for both changes in regulations and changes in our business. 

                    </Text>
                    <Text>
                      The purpose of this Privacy Policy is to inform you of:{" "}
                    </Text>
  
                    <ol>
                      <li>
                        the kinds of Personal Information which we may collect
                        about you and how it may be used;
                      </li>
                      <li>
                        our use of information regarding IP Addresses and our use
                        of cookies;
                      </li>
                      <li>
                        how your Personal Information may be disclosed to third
                        parties;
                      </li>
                      <li>
                        your ability to access, correct, update and delete your
                        Personal Information; and
                      </li>
                      <li>
                        the security measures we have in place to prevent the
                        loss, misuse, or alteration of Personal Information under
                        our control.
                      </li>
                    </ol>
                  </PrivacySection>
                  <PrivacySection>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>
                    2. AML/CFT COMPLIANCE PERSON DESIGNATION AND DUTIES
                    </Text>
                    <Text>
                    BITGIFTY.COM has a designated Money Laundering Reporting Officer (“MLRO”).The MLRO has full responsibility for the BITGIFTY.COM’s AML/CFT program. The duties of the MLRO will include monitoring BITGIFTY.COM’s compliance with AML/CFT obligations, overseeing communication and training for employees and overseeing BITGIFTY.COM’s software modifications to ensure they comply with AML/CFT obligations.
                    </Text>
                    The MLRO will also ensure that BITGIFTY.COM keeps and maintains all of the required AML/CFT records and will ensure that any Suspicious Transaction Reports (“STR”) generated by BITGIFTY.COM’s software are filed with the Financial Crime Unit (“FCU”) when appropriate. The MLRO is vested with full responsibility and authority to enforce BITGIFTY.COM’s AML/CFT program. BITGIFTY.COM will provide the company administrators, company secretary and associated financial institutions with contact information for the MLRO, including: (1) name; (2) title; (3) mailing address; (4) email address; and (5) telephone number. 
                    <Text>
                    BITGIFTY.COM will promptly notify all parties of any change in this information and will review, and if necessary update, this information within 30 business days after the end of each calendar year. The annual review of this information will be conducted by the MLRO and will be completed with all necessary updates being provided no later than 30 business days following the end of each calendar year. In addition, if there is any change to the information, the MLRO will update the information promptly, but in any event not later than 30 days following the change. 

                    </Text>
                   
                  </PrivacySection>
                  <PrivacySection>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>
                    3. GIVING AML/CFT INFORMATION TO NIGERIAN GOVERNMENT AUTHORITIES IF REQUESTED
                    </Text>
                    <Text>
                    We will respond to a request (“Request”) concerning accounts and transactions by immediately searching our records to determine whether we maintain or have maintained any account for, or have engaged in any transaction with, each individual, entity or organisation named in the Request. We will designate one or more persons to be the point of contact (POC) for Requests and will promptly update the POC information following any change in such information. (See Section 2 above regarding updating of contact information for the MLRO.)
                    </Text>
                    <Text>
                    Unless otherwise stated in the Request, we are required to search our files for each individual, entity or organisation named in the Request. If we find a match, the MLRO will consider any appropriate action. If the search parameters differ from searching through our entire database, for example, if limits to a geographic location apply, the MLRO will structure our search accordingly. If the MLRO searches our records and does not find a matching account or transaction, then the MLRO will not reply to the Request. 
                    </Text>
                    <Text>
                    We will maintain a register of Money Laundering and Financing of Terrorism Enquiries together with documentation that we have performed the required search by saving the logs, which will at all times be available on request. We will not disclose the fact that the authorities have requested or obtained information from us, except to the extent necessary to comply with the Request. The MLRO will review, maintain and implement procedures to protect the security and confidentiality of requests from the authorities with regard to the protection of customers’ non-public information.                    
                    </Text>
                    <Text>
                    We will direct any questions we have about the Request to the authorities. Unless otherwise stated in the Request, we will not be required to treat the information request as continuing in nature, and we will not be required to treat the Request as a government provided list of suspected terrorists for purposes of the customer identification and verification requirements. 
                    </Text>
                  </PrivacySection>
                  <PrivacySection>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>
                    4. LEVELS OF CDD
                    </Text>
                    <Text>
                    Level 1 clearance: People who have opened an account need to provide a scanned copy of photo graphic ID and proof of address (as explain in clause 5), prior to being allowed to deposit, trade and withdraw currencies. This is known as Level 1 clearance, which allows deposits and withdrawals of NGN 2 million a day and NGN 20 million a month. Level 2 clearance allows for NGN 5 million a day, 50 million a month, automatically granted if customer has Level one clearance and have been trading on the platform for a month and accumulate a trading volume worth no less than 50 million. Level 3 clearance allows for unlimited deposits and withdrawals which available only to customer has Level 2 clearance and for this we will need original certified photographic ID and proof of address in our possession. 
                    </Text>
                    <PrivacySection>
                      <Text fontSize={"2xl"} fontWeight={"bold"}>
                      5. CUSTOMER DUE DILIGENCE (“CDD”) AND KNOW YOUR CLIENT IDENTIFICATION PROGRAM (“KYC”)
                      </Text>
                      <Text>
                      We will collect sufficient information from each customer who has opened an account to enable the customer to be identified; utilise risk-based measures to verify the identity of each customer who has opened an account; record CDD information and the verification methods and results; provide the required adequate CDD notice to customers that we will seek identification information to verify their identities; and compare customer identification information with government-provided lists of suspected terrorists, once such lists have been issued by the government. 

                      </Text>
                    </PrivacySection>
                  </PrivacySection>
                  <PrivacySection>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>
                    REQUIRED CUSTOMER INFORMATION

                    </Text>
                    <Text>
                    After opening an account, BITGIFTY.COM will collect the following information for all accounts, if applicable, for any person, entity or organisation that is opening a new account and whose name is on the account prior to activating the account for deposits and withdrawals of FIAT currencies (deposits, trading and withdrawing digital currencies does not require CDD verification): the name; date and place of birth (for an individual); nationality; gender; email; phone number; proof of a residential address (for an individual), or a principal place of business, local office, or other physical location (for a person other than an individual); and proof of identification with a photograph.
                    </Text>
                  </PrivacySection>
                  <PrivacySection>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>
                    CUSTOMERS WHO REFUSE TO PROVIDE INFORMATION                    
                    </Text>
                    <Text>
                    If a potential or existing customer either refuses to provide the information described above when requested, or appears to have intentionally provided misleading information, BITGIFTY.COM will deactivate the account and, after considering the risks involved, consider closing any existing account. In either case, our MLRO will be notified so that we can determine whether we should report the situation to the authorities. 

                    </Text>
                  </PrivacySection>
                  <PrivacySection>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>
                    VERIFYING INFORMATION

                    </Text>
                    <Text>
                    Based on the risk, and to the extent reasonable and practicable, we will ensure that we have a reasonable belief that we know the true identity of our customers by using risk-based procedures to verify and document the accuracy of the information we get about our customers, but in any case complying with the statutory requirements. The MLRO will analyse the information we obtain to determine whether the information is sufficient to form a reasonable belief that we know the true identity of the customer (e.g., whether the information is logical or contains inconsistencies).We will verify customer identity through documentary means, non-documentary means or both. We will use documents to verify customer identity when appropriate documents are available. In light of the increased instances of identity fraud, we will supplement the use of documentary evidence by using the non-documentary means described below whenever necessary. We may also use non-documentary means, if we are still uncertain about whether we know the true identity of the customer. In verifying the information, we will consider whether the identifying information that we receive, such as the customer’s name, street address, postcode, email, telephone number, date of birth and photographic ID, allow us to determine that we have a reasonable belief that we know the true identity of the customer (e.g., whether the information is logical or contains inconsistencies).
                    </Text>
                    <Text fontWeight={"bold"}>
                    Appropriate documents for verifying the identity of customers include the following:
                    </Text>
                    <Text>
                        For an individual
                    </Text>
                    <ol>
                        <li>Certified proof of identity (passport copy or provisional or full driving licence or Government issued National Identity Card (picture page is sufficient)</li>
                        <li>Certified proof of residential address (utility bill* less than 3 months old or bank statement) </li>
                        <li>Electricity, gas, water, phone bill (not mobile phone)</li>
                    </ol>
                    <Text>
                        For a Corporation
                    </Text>
                    <ol>
                        <li>Certificate of Incorporation•Memorandum and articles of Association</li>
                        <li>Identify the Beneficial Owner </li>
                        <li>For at least 2 directors of a Corporation – proof of identity and proof of residential address</li>
                    </ol>
                    <Text>All of the above documents should be certified by a notary public The certifier must sign and date the copy document (printing his/her name clearly in capitals underneath) and clearly indicate his/her position or capacity on it and provide his contact details. The certifier must state that it is a true copy of the original. Any non-English documentation requires translation and certification as above. </Text>
                    <Text>We are not required to take steps to determine whether the document that the customer has provided to us for identity verification has been validly issued and that we may rely on a government-issued identification as verification of a customer’s identity. If, however, we note that the document shows some obvious form of fraud, we must consider that factor in determining whether we can form a reasonable belief that we know the customer’s true identity. We will use the following non-documentary methods of verifying identity: </Text>
                    <ol>
                        <li>Confirming validity of email</li>
                        <li>Confirming validity of telephone number </li>
                    </ol>
                    <Text>We will verify the information within a reasonable time after the account is opened. Depending on the nature of the account and requested transactions, we may refuse to complete a transaction before we have verified the information, or in some instances when we need more time, we may, pending verification, restrict the types of transactions or dollar amount of transactions. If we find suspicious information that indicates possible money laundering, terrorist financing activity, or other suspicious activity, we will, after internal consultation with BITGIFTY.COM’s MLRO, report the activity in accordance with applicable laws and regulations. </Text>
                    <Text>We recognise that the risk that we may not know the customer’s true identity may be heightened for certain types of accounts, such as an account opened in the name of a corporation, partnership or trust that is created or conducts substantial business in a jurisdiction that has been designated as a primary money laundering jurisdiction, a terrorist concern, or has been designated as a non-cooperative country or territory. We will identify customers that pose a heightened risk of not being properly identified. We will also take the following additional measures that may be used to obtain information about the identity of the individuals associated with the customer when standard documentary methods prove to be insufficient: Obtain verification of beneficial owners of corporations Obtain additional references from financial institutions  </Text>
                    
                  </PrivacySection>
                  <PrivacySection>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>
                    LACK OF VERIFICATION

                    </Text>
                    <Text>
                      There may be links from our Site to other sites and
                      resources provided by third parties. This Privacy Policy
                      applies only to our Site, and any correspondence had with us
                      via BitGifty.com. Accessing those third-party sites or
                      sources requires you to leave our Site. We do not control
                      those third-party sites or any of the content contained
                      therein and you agree that we are in no way responsible or
                      liable for any of those third-party sites, including,
                      without limitation, their content, policies, failures,
                      promotions, products, services or actions and/or any
                      damages, losses, failures or problems caused by, related to
                      or arising from those sites. We encourage you to review all
                      policies, rules, terms, and regulations, including the
                      privacy policies, of each site that you visit. violations.
                    </Text>
                  </PrivacySection>
                  <PrivacySection>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                      LACK OF VERIFICATION
                    </Text>
                    <Text>
                    When we cannot form a reasonable belief that we know the true identity of a customer, we will do the following: (1) deactivate the account or keep it in deactivated status; (2) close an account after attempts to verify customer’s identity fail; and (3) determine whether it is necessary to inform the FSC or FCU in accordance with applicable laws and regulations. 

                    </Text>
                  </PrivacySection>
                  <PrivacySection>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                    RECORDKEEPING
                    </Text>
                    <Text>
                    We will keep logs of our verification, including all identifying information provided by a customer, the methods used and results of verification, and the resolution of any discrepancies identified in the verification process. We will keep records containing a description of any document that we relied on to verify a customer’s identity, noting the type of document, any identification number contained in the document, the place of issuance, and if any, the date of issuance and expiration date.  

                    </Text>
                    <Text>
                    With respect to non-documentary verification, we will retain logs that describe the methods and the results of any measures we took to verify the identity of a customer. We will also keep records containing a description of the resolution of each substantive discrepancy discovered when verifying the identifying information obtained. We will retain records of all identification information for five years after the account has been closed; we will retain records made about verification of the customer’s identity for five years after the record is made. 
                    </Text>
                    
                  </PrivacySection>
                  <PrivacySection>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                    COMPARISON WITH GOVERNMENT-PROVIDED LISTS OF TERRORISTS
                    </Text>
                    <Text>
                    At such time as we receive notice that the authorities have issued a list of known or suspected terrorists and identified the list as a list for CDD purposes, we will, within a reasonable period of time after an account is opened (or earlier, if required by another law or regulation or directive issued in connection with an applicable list), determine whether a customer appears on any such list of known or suspected terrorists or terrorist organisations issued by any government agency and designated as such by the authorities in consultation with the functional regulators. We will follow all directives issued in connection with such lists. 
 

                    </Text>
                    
                  </PrivacySection>
                  <PrivacySection>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                    TO CUSTOMERS

                    </Text>
                    <Text>
                    We will provide notice to customers that BITGIFTY.COM is requesting information from them to verify their identities, as required by law. We will use the following method to provide notice to customers: Inform them by email and through BITGIFTY.COM’s software when the customer wants to activate their account for depositing and withdrawing FIAT currencies, by using the following text: <b>Important Information About Procedures for Activating a New Account</b>
                    </Text>
                    <Text>
                    To help the government fight the funding of terrorism and money laundering activities, BITGIFTY.COM is required to obtain, verify, and record information that identifies each person who opens an account and wishes to deposit and withdraw FIAT currencies. What this means for you: When you would like to deposit and withdraw FIAT currencies, we will ask for your name, address, date of birth and other information that will allow us to identify you. We will also ask to see photographic proof of your identification and proof of address. 
                    </Text>
                    
                  </PrivacySection>
                  <PrivacySection>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                    RELIANCE ON ANOTHER FINANCIAL INSTITUTION FOR IDENTITY VERIFICATION

                    </Text>
                    <Text>
                    We may, under the following circumstances, rely on the performance by another party (including an affiliate) of some or all of the elements of our CDD with respect to any customer that is opening an account or has established an account or similar business relationship with the other party to provide or engage in services, dealings or other financial transactions: when such reliance is reasonable under the circumstances when the other party has entered into a contract with BITGIFTY.COM requiring it to certify annually to us that it has implemented its anti-money laundering and counter terrorist financing program and that it will perform (or its agent will perform) specified requirements of the CDD program. 

                    </Text>
                   
                    
                  </PrivacySection>
                  <PrivacySection>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>
                    6. GENERAL CUSTOMER DUE DILIGENCE
                    </Text>
                    <Text>
                    It is important to our AML and KYC reporting program that we obtain sufficient information about each customer to allow us to evaluate the risk presented by that customer and to detect and report suspicious activity. When we open an account for a customer, the due diligence we perform may need to be enhanced. For each account meeting the following criteria and which could be deemed to be higher risk: 
                    </Text>
                    <ol>
                        <li>Corporations in off shore jurisdiction;</li>
                        <li>Individuals from high risk countries; and </li>
                        <li>CDD documentation of questionable origin</li>
                    </ol>
                    <Text>
                    We will take steps to obtain sufficient customer information to comply with our enhanced due diligence requirements. Such information should include: 
                    </Text>
                    <ol>
                        <li>Identification of beneficial owners of corporations•Reference from a financial institution</li>
                        <li>Proof of source of funds </li>
                    </ol>
                  </PrivacySection>
                  <PrivacySection>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>
                     7. CUSTOMER DUE DILIGENCE AND ENHANCED DUE DILIGENCE REQUIREMENTS FOR PRIVATE BANKING ACCOUNTS/SENIOR FOREIGN POLITICAL FIGURES
                    </Text>
                    <Text>
                    We do not open or maintain private banking accounts.
                    </Text>
                    </PrivacySection>
                    <PrivacySection>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>8. MONITORING ACCOUNTS FOR SUSPICIOUS ACTIVITY</Text>
                    <Text>
                    We will monitor account activity for unusual size, volume, pattern or type of transactions, taking into account risk factors and red flags that are appropriate to our business. (Red flags are identified in Section 7.b. below.) The MLRO or his or her designee will be responsible for this monitoring, will review any activity that our monitoring system detects, will determine whether any additional steps are required, will document when and how this monitoring is carried out, and will report suspicious activities to the appropriate authorities. The MLRO or his or her designee will conduct an appropriate investigation and review relevant information from internal or third-party sources before the authorities are notified.
                    </Text>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>1. Emergency Notification to Law Enforcement by Telephone In situations involving violations that require immediate attention, such as terrorist financing or ongoing money laundering schemes, we will immediately call an appropriate law enforcement authority. </Text>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>2. Red Flags Red flags that signal possible money laundering or terrorist financing include, but are not limited to: Customers </Text>
                    <ul>
                      <li>Insufficient or Suspicious Information</li>
                      <li>Provides unusual or suspicious identification documents that cannot be readily verified. </li>
                      <li>Reluctant to provide complete information about nature and purpose of business, prior banking relationships, anticipated account activity, officers and directors or business location.</li>
                      <li>Refuses to identify a legitimate source for funds or information is false, misleading or substantially incorrect.</li> 
                      <li> Background is questionable or differs from expectations based on business activities.</li>
                      <li>Customer with no discernible reason for using BITGIFTY.COM’s service.</li>
                      <li>Efforts to Avoid Reporting and Recordkeeping</li>
                      <li>Reluctant to provide information needed to file reports or fails to proceed with transaction.</li>
                      <li>Tries to persuade an employee not to file required reports or not to maintain required records.</li>
                      <li>“Structures” deposits, withdrawals or purchase of monetary instruments below a certain amount to avoid reporting or recordkeeping requirements.</li>
                      <li>Unusual concern with BITGIFTY.COM’s compliance with government reporting requirements and BITGIFTY.COM’s AML/CFT policies. Certain Funds Transfer Activities</li>
                      <li>Wire transfers to/from financial secrecy havens or high-risk geographic location without an apparent business reason.</li>
                      <li>Many small, incoming wire transfers or deposits made using checks and money orders. Almost immediately withdrawn or wired out in manner inconsistent with customer’s business or history. May indicate a Ponzi scheme.</li>
                      <li>Wire activity that is unexplained, repetitive, unusually large or shows unusual patterns or with no apparent business purpose. Activity Inconsistent With Business</li>
                      <li>Transactions patterns show a sudden change inconsistent with normal activities</li>
                      <li>Unusual transfers of funds or journal entries among accounts without any apparent business purpose.</li>
                      <li>Maintains multiple accounts, or maintains accounts in the names of family members or corporate entities with no apparent business or other purpose.</li>
                      <li>Appears to be acting as an agent for an undisclosed principal, but is reluctant to provide information. Other Suspicious Customer Activity</li>
                      <li> Unexplained high level of account activity with very low levels of securities transactions.</li>
                      <li>Funds deposits for purchase of a long-term investment followed shortly by a request to liquidate the position and transfer the proceeds out of the account.</li>
                      <li>Law enforcement requests.</li>
                    </ul>

                    <Text fontSize={"2xl"} fontWeight={"bold"}>Responding to Red Flags and Suspicious Activity </Text>
                    <Text>When an employee of BITGIFTY.COM detects any red flag, or other activity that may be suspicious, he or she will notify the MLRO. Under the direction of the MLRO, BITGIFTY.COM will determine whether or not and how to further investigate the matter. This may include gathering additional information internally or from third-party sources, contacting the government, freezing the account and/or informing the authorities. </Text>
                    </PrivacySection>
                    
                    <PrivacySection>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>9. SUSPICIOUS TRANSACTIONS REPORTING</Text>
                      <Text>a. Filing a report with the FSC or FCU We will file a report with the authorities for any transactions (including deposits and transfers) conducted or attempted by, at or through BITGIFTY.COM involving $10,000 or more of funds (either individually or in the aggregate) where we know, suspect or have reason to suspect: (1)the transaction involves funds derived from illegal activity or is intended or conducted in order to hide or disguise funds or assets derived from illegal activity as part of a plan to violate or evade law or regulation or to avoid any transaction reporting requirement under law or regulation; (2)the transaction is designed, whether through structuring or otherwise, to evade any requirements of the regulations; (3)the transaction has no business or apparent lawful purpose or is not the sort in which the customer would normally be expected to engage, and after examining the background, possible purpose of the transaction and other facts, we know of no reasonable explanation for the transaction; or (4)the transaction involves the use of BITGIFTY.COM to facilitate criminal activity. We will also file a report and notify the appropriate law enforcement authority in situations involving violations that require immediate attention, such as terrorist financing or ongoing money laundering schemes. We may file a voluntary report for any suspicious transaction that we believe is relevant to the possible violation of any law or regulation but that is not required to be reported by us. It is our policy that all suspicious activities will be reported regularly to the Board of Directors and appropriate senior management.</Text>
                      <Text>b. Currency Transaction Reports BITGIFTY.COM only allows FIAT currency transactions once accounts are activated. Any transfers over $10,000 may be reported to the authorities.</Text>
                      <Text>
                      c.Currency Transportation BITGIFTY.COM prohibits both the receipt of currency or other monetary instruments that have been transported, mailed or shipped to us. BITGIFTY.COM only accepts currency transactions through financial institutions and internationally recognised payment platforms.
                      </Text>
                      <Text>
                      d.Monetary Instrument Purchases We do not issue bank checks or drafts, cashier’s checks, money orders or traveller’s checks.
                      </Text>
                    </PrivacySection>
                    <PrivacySection>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>10. AML/CFT RECORDKEEPING </Text>
                    <Text>a.Responsibility for Required AML Records Our MLRO and his or her designee will be responsible for ensuring that AML/CFT records are maintained properly. In addition, as part of our AML/CFT program, BITGIFTY.COM will create and maintain all relevant documentation on customer identity and verification (See Section 4 above) and funds transmittals. We will maintain all documentation for at least five years.</Text>
                    <Text>
                    b.AML/CFT Reporting Maintenance and Confidentiality We will hold reports and any supporting documentation confidential. We will not inform anyone outside of the authorities or other appropriate law enforcement or regulatory agency about a report. We will segregate report filings and copies of supporting documentation from other firm books and records to avoid disclosing information. Our MLRO will handle all requests for reports. We may share information with another financial institution about suspicious transactions in order to determine whether we will jointly file a report according to the rules and regulations of the authorities. In cases in which we file a joint report for a transaction that has been handled both by us and another financial institution, both financial institutions will maintain a copy of the filed report.
                    </Text>
                    <Text>
                    c.Additional Records We shall retain either the original or a microfilm or other copy or reproduction of each of the following: –A record of each advice, request or instruction received or given regarding any transaction resulting (or intended to result and later cancelled if such a record is normally made) in the transfer of currency or other monetary instruments, funds of more than $10,000; –A record of each advice, request or instruction given to another financial institution (which includes broker-dealers) or other person, regarding a transaction intended to result in the transfer of funds, or of currency, other monetary instruments, of more than $10,000; –Each document granting signature or trading authority over each customer’s account; –A record of each remittance or transfer of funds, or of currency of more than $10,000 to a person, account or place; and –A record of each receipt of currency and of each transfer of funds of more than $10,000 received on any one occasion directly and not through a domestic financial institution, from any person, account or place. 
                    </Text>
                    </PrivacySection>
                    <PrivacySection>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>11. CLEARING/INTRODUCING RELATIONSHIPS</Text>
                    <Text>
                    We will work closely with all collaborating institutions to detect money laundering. We will exchange information, records and data as necessary to comply with AML/CFT laws. 
                    </Text>
                    </PrivacySection>
                    <PrivacySection>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>12. TRAINING PROGRAMS </Text>
                    <Text>
                    We will develop ongoing employee training under the leadership of the MLRO and senior management. Our training will occur on at least an annual basis. It will be based on our firm’s size, its customer base, and its resources and be updated as necessary to reflect any new developments in the law. Our training will include, at a minimum: (1) how to identify red flags and signs of money laundering and/or the financing of terrorism that arise during the course of the employees’ duties; (2) what to do once the risk is identified (including how, when and to whom to escalate unusual customer activity or other red flags for analysis and, where appropriate, the filing of reports to the authorities; (3) what employees’ roles are in BITGIFTY.COM’s compliance efforts and how to perform them; (4) BITGIFTY.COM’s record retention policy; and (5) the disciplinary consequences (including civil and criminal penalties) for non-compliance with the FSC regulations. We will develop training in our firm, or contract for it. Delivery of the training may include educational pamphlets, videos, intranet systems, in-person lectures and explanatory memos. We will maintain records to show the persons trained, the dates of training and the subject matter of their training. We will review our operations to see if certain employees, such as those in compliance, margin and corporate security, require specialised additional training. Our written procedures will be updated to reflect any such changes.
                    </Text>
                    </PrivacySection>
                    <PrivacySection>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>13. PROGRAM TO INDEPENDENTLY TEST AML/CFT PROGRAM</Text>
                    <Text>Staffing The testing of our AML/CFT program will be performed at least annually (on a calendar year basis) by the testing officer, personnel of BITGIFTY.COM, who is not the MLRO nor does he perform the AML/CFT functions being tested nor does he report to any such persons. His qualifications include a working knowledge of applicable requirements under the FSC rules and regulations. To ensure that he remains independent, we will separate his functions from other AML/CFT activities. Independent testing will be performed more frequently if circumstances warrant. Evaluation and Reporting After we have completed the independent testing, staff will report its findings to an internal audit committee. We will promptly address each of the resulting recommendations and keep a record of how each noted deficiency was resolved </Text>
                    </PrivacySection>
                    <PrivacySection>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>14. MONITORING EMPLOYEE CONDUCT AND ACCOUNTS</Text>
                    <Text>We will subject employee accounts to the same AML/CFT procedures as customer accounts, under the supervision of the MLRO. We will also review the AML/CFT performance of supervisors, as part of their annual performance review. The MLRO’s accounts will be reviewed by the testing officer</Text>
                    </PrivacySection>
                    <PrivacySection>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>15. CONFIDENTIAL REPORTING OF AML/CFT NON-COMPLIANCE</Text>
                    <Text>Employees will promptly report any potential violations of BITGIFTY.COM’s AML/CFT compliance program to the MLRO, unless the violations implicate the MLRO, in which case the employee shall report to the testing officer. Such reports will be confidential, and the employee will suffer no retaliation for making them. </Text>
                    </PrivacySection>
                    <PrivacySection>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>16. ADDITIONAL RISK AREAS </Text>
                    <Text>BITGIFTY.COM has reviewed all areas of its business to identify potential money laundering and/or financing of terrorism risks that may not be covered in the procedures described above. The major additional areas of risk include future changes to regulations and hacking attempts on BITGIFTY.COM’s servers. Additional procedures to address these major risks are maintaining constant contact with the FSC and performing daily security checks on BITGIFTY.COM’s server security procedures, performed by a dedicated server security specialist. </Text>
                    </PrivacySection>
                    <PrivacySection>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>17. SENIOR MANAGER APPROVAL  </Text>
                    <Text>Senior management has approved this AML/CFT compliance program in writing as reasonably designed to achieve and monitor our firm’s ongoing compliance with the requirements of the FSC and the implementing regulations under it. This approval is indicated by signatures below.</Text>
                    </PrivacySection>
                  <PrivacySection>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                      CONTACT US
                    </Text>
                    <Text>
                      If you have any questions, comments, or concerns regarding
                      our Privacy Policy and/or practices as it or they relate to
                      the Platform, please contact us at contact@bitgiftyapp.com. If
                      you have a complaint about how your Personal Information has
                      been used, please contact us in the first instance. If we
                      cannot resolve your complaint to your satisfaction, you may
                      complain to the Privacy Commissioner who may investigate
                      your complaint further.
                    </Text>
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
  
  export default Aml;
  
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
  
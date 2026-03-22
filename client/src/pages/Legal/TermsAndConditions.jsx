import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

const TermsAndConditions = () => {
  const effectiveDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const legalText = [
    {
      title: "ARTICLE I: RECITALS AND DEFINITIONS",
      content: `1.1 PREAMBLE. This Terms of Service Agreement (hereinafter referred to as the "Agreement") is a master agreement between Painters' Diary ("Service Provider", "Us", "We") and the entity or individual ("Subscriber", "User", "You") accessing the proprietary digital ecosystem. 

1.2 DEFINITIONS. 
(a) "Constructive Notice" implies knowledge of a fact presumed by law to have been acquired, irrespective of actual knowledge.
(b) "Force Majeure" encompasses acts of God, war, cyber-warfare, distributed denial of service (DDoS) attacks, and sub-oceanic cable severances.
(c) "User Generated Content" (UGC) refers to any semantic data, visual representations, or binary code uploaded by the User.

1.3 INTERPRETATION. In this Agreement, unless the context otherwise requires: words importing the singular include the plural and vice versa; references to statutes include all statutory modifications or re-enactments; and headings are for convenience only and shall not affect the interpretation of this Agreement.`
    },
    {
      title: "ARTICLE II: GRANT OF LICENSE AND RESTRICTIONS",
      content: `2.1 LICENSE GRANT. Subject to the terms and conditions of this Agreement, We hereby grant to You a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access and use the Service strictly in accordance with this Agreement.

2.2 RESTRICTIONS ON USE. You shall not, directly or indirectly: 
(i) reverse engineer, decompile, disassemble or otherwise attempt to discover the source code, object code or underlying structure, ideas, know-how or algorithms relevant to the Services; 
(ii) modify, translate, or create derivative works based on the Services; 
(iii) use the Services for timesharing or service bureau purposes or otherwise for the benefit of a third party; 
(iv) remove any proprietary notices or labels.

2.3 RESERVATION OF RIGHTS. All rights not expressly granted to You in this Agreement are reserved and retained by Us and Our licensors.`
    },
    {
      title: "ARTICLE III: USER OBLIGATIONS AND WARRANTIES",
      content: `3.1 REPRESENTATIONS. You represent and warrant that: (a) You are at least eighteen (18) years of age or the age of majority in Your jurisdiction; (b) You possess the legal right and ability to enter into this Agreement; and (c) the performance of Your obligations hereunder does not violate any other agreement to which You are a party.

3.2 COVENANTS. You covenant that You shall not use the Service to:
(a) Transmit any material that contains adware, malware, spyware, software viruses, or any other harmful code;
(b) Impersonate any person or entity, or falsely state or otherwise misrepresent Your affiliation with a person or entity;
(c) Interfere with or disrupt the integrity or performance of the Service or the data contained therein.`
    },
    {
      title: "ARTICLE IV: INTELLECTUAL PROPERTY RIGHTS",
      content: `4.1 PROPRIETARY RIGHTS. You acknowledge and agree that the Service and any necessary software used in connection with the Service contain proprietary and confidential information that is protected by applicable intellectual property and other laws.

4.2 LICENSE TO USER CONTENT. By submitting, posting or displaying Content on or through the Service, You grant Us a worldwide, non-exclusive, royalty-free license (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, publish, transmit, display and distribute such Content in any and all media or distribution methods (now known or later developed).

4.3 WAIVER OF MORAL RIGHTS. To the fullest extent permitted by law, You waive any moral rights, rights of paternity, rights of integrity, or similar rights in Your Content.`
    },
    {
      title: "ARTICLE V: PAYMENT, TAXES, AND CURRENCY",
      content: `5.1 FEES. Access to certain functionalities is contingent upon payment of fees ("Subscription Fees"). All fees are denominated in United States Dollars (USD) unless explicitly stated otherwise.

5.2 TAXATION. You are responsible for all applicable taxes, including but not limited to Value Added Tax (VAT), Goods and Services Tax (GST), and sales tax, arising from or as a result of your subscription to or use of the Service.

5.3 NO REFUNDS. EXCEPT AS REQUIRED BY APPLICABLE LAW, ALL FEES PAID ARE NON-REFUNDABLE. WE DO NOT PROVIDE PRICE PROTECTION OR REFUNDS IN THE EVENT OF A PRICE DROP OR PROMOTIONAL OFFERING.`
    },
    {
      title: "ARTICLE VI: DATA PROTECTION AND PRIVACY",
      content: `6.1 DATA PROCESSING. Our collection and use of personal information in connection with the Services is described in our Privacy Policy. You agree to the data practices, including the technical processing and transmission of Your Content, as described therein.

6.2 INTERNATIONAL TRANSFERS. You acknowledge that Your data may be transferred to, stored in, or processed in jurisdictions with data protection laws that differ from those in Your country of residence.`
    },
    {
      title: "ARTICLE VII: DISCLAIMER OF WARRANTIES",
      content: `7.1 "AS IS" BASIS. THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.

7.2 NO WARRANTY. WE MAKE NO WARRANTY THAT (I) THE SERVICE WILL MEET YOUR REQUIREMENTS, (II) THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, (III) THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICE WILL BE ACCURATE OR RELIABLE, OR (IV) THE QUALITY OF ANY PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIAL PURCHASED OR OBTAINED BY YOU THROUGH THE SERVICE WILL MEET YOUR EXPECTATIONS.`
    },
    {
      title: "ARTICLE VIII: LIMITATION OF LIABILITY",
      content: `8.1 CONSEQUENTIAL DAMAGES WAIVER. IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (i) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (ii) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE; (iii) ANY CONTENT OBTAINED FROM THE SERVICE; AND (iv) UNAUTHORIZED ACCESS, USE OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE) OR ANY OTHER LEGAL THEORY.

8.2 LIABILITY CAP. IN NO EVENT SHALL THE AGGREGATE LIABILITY OF THE COMPANY EXCEED THE GREATER OF ONE HUNDRED U.S. DOLLARS (U.S. $100.00) OR THE AMOUNT YOU PAID THE COMPANY, IF ANY, IN THE PAST SIX MONTHS FOR THE SERVICES GIVING RISE TO THE CLAIM.`
    },
    {
      title: "ARTICLE IX: INDEMNIFICATION",
      content: `9.1 INDEMNITY. You agree to defend, indemnify and hold harmless the Company and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of a) Your use and access of the Service, by You or any person using Your account and password, or b) a breach of these Terms.`
    },
    {
      title: "ARTICLE X: DISPUTE RESOLUTION AND ARBITRATION",
      content: `10.1 MANDATORY ARBITRATION. Any dispute, controversy or claim arising out of or relating to this contract, including the formation, interpretation, breach or termination thereof, including whether the claims asserted are arbitrable, will be referred to and finally determined by arbitration in accordance with the JAMS International Arbitration Rules. The tribunal will consist of one arbitrator. The place of arbitration will be New York, New York.

10.2 CLASS ACTION WAIVER. YOU AND THE COMPANY AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.`
    },
    {
      title: "ARTICLE XI: TERMINATION",
      content: `11.1 TERMINATION FOR CONVENIENCE. We may terminate or suspend Your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach the Terms.

11.2 EFFECT OF TERMINATION. Upon termination, Your right to use the Service will immediately cease. If You wish to terminate Your account, You may simply discontinue using the Service. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.`
    },
    {
      title: "ARTICLE XII: MISCELLANEOUS PROVISIONS",
      content: `12.1 SEVERABILITY. If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.

12.2 WAIVER. Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not effect a party's ability to exercise such right or require such performance at any time thereafter nor shall be the waiver of a breach constitute a waiver of any subsequent breach.

12.3 ENTIRE AGREEMENT. These Terms constitute the entire agreement between Us and You regarding our Service, and supersede and replace any prior agreements we might have had between us regarding the Service.

12.4 ASSIGNMENT. We may assign our rights and obligations under these Terms without notification. You may not assign these Terms without our prior written consent.`
    },
    {
      title: "ARTICLE XIII: CONTACT AND NOTICE",
      content: `13.1 METHOD OF NOTICE. All notices under this Agreement shall be in writing and shall be deemed to have been duly given when received, if personally delivered or sent by certified or registered mail, return receipt requested; when receipt is electronically confirmed, if transmitted by facsimile or e-mail; or the day after it is sent, if sent for next day delivery by recognized overnight delivery service.

13.2 CONTACT INFORMATION. For specific legal inquiries regarding this Agreement, correspondence should be directed to: legal@paintersdiary.com`
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-400 font-serif leading-loose text-justify selection:bg-zinc-200 dark:selection:bg-zinc-800">
      
      <header className="fixed top-0 left-0 w-full h-16  border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 z-50">
        <div className="flex items-center">
          <Link to="/" className="text-lg font-bold tracking-tight text-black dark:text-white font-Eagle">
            Painters' Diary
          </Link>
        </div>
        <div>
          <Link to="/Account" className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
            <User size={18} />
          </Link>
        </div>
      </header>

      {/* HEADER - STRICTLY UTILITARIAN */}
      <header className="w-full py-16 px-8 border-b border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black sticky top-0 z-50 opacity-95">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-black text-black dark:text-zinc-200 uppercase tracking-[0.2em] mb-4 text-center">
            Terms of Service
          </h1>
          <div className="flex flex-col md:flex-row gap-4 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            <span>Doc ID: LEG-2025-X99</span>
            <span className="hidden md:inline">|</span>
            <span>Effective: {effectiveDate}</span>
            <span className="hidden md:inline">|</span>
            <span>Jurisdiction: Delaware, USA</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT - THE WALL OF TEXT */}
      <main className="max-w-5xl mx-auto px-8 py-24">
        
        {/* DISCLAIMER BLOCK */}
        <div className="mb-20 p-8 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/20 text-xs font-mono text-zinc-600 dark:text-zinc-500 text-justify uppercase tracking-wide">
          <p>
            NOTICE: PLEASE READ THESE TERMS CAREFULLY. BY ACCESSING THIS SITE YOU AGREE TO BE BOUND BY THE TERMS AND CONDITIONS BELOW. THESE TERMS AND CONDITIONS ARE SUBJECT TO CHANGE WITHOUT NOTICE, FROM TIME TO TIME IN OUR SOLE DISCRETION. WE WILL NOTIFY YOU OF AMENDMENTS TO THESE TERMS AND CONDITIONS BY POSTING THEM TO THIS WEBSITE. IF YOU DO NOT AGREE WITH THESE TERMS AND CONDITIONS, PLEASE DO NOT ACCESS THIS WEBSITE.
          </p>
        </div>

        {/* ARTICLES */}
        <div className="space-y-16">
          {legalText.map((article, index) => (
            <article key={index} className="border-l-2 border-zinc-200 dark:border-zinc-800 pl-8 md:pl-12">
              <h2 className="text-sm font-bold text-black dark:text-zinc-200 uppercase tracking-widest mb-6 select-none">
                {article.title}
              </h2>
              <div className="text-zinc-800 dark:text-zinc-400 text-sm md:text-base whitespace-pre-wrap font-medium">
                {article.content}
              </div>
            </article>
          ))}
        </div>

        {/* FOOTER BLOCK */}
        <div className="mt-32 pt-12 border-t-2 border-zinc-100 dark:border-zinc-900 text-center">
          <p className="text-[10px] text-zinc-400 mb-8 font-mono uppercase">
            Constructive Notice served upon access. No signature required for enforcement.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-500">
            <Link to="/" className="hover:text-black dark:hover:text-white transition-colors">Return Home</Link>
            <Link to="/contact" className="hover:text-black dark:hover:text-white transition-colors">Legal Contact</Link>
            <span className="text-zinc-300 dark:text-zinc-700 select-none">|</span>
            <span className="cursor-not-allowed opacity-50">Print Document</span>
          </div>
        </div>

      </main>
    </div>
  );
};

export default TermsAndConditions;
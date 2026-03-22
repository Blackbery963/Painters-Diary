import React from 'react'
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

function SecurityPolicy() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const policySections = [
    {
      title: "ARTICLE I: PREAMBLE AND DEFINITIONS",
      content: `THIS PRIVACY POLICY ("Policy") constitutes a legally binding agreement between Painters' Diary ("Data Controller", "Us", "We") and the User ("Data Subject", "You"). By accessing the Platform, You hereby explicitly acknowledge and consent to the data processing practices stipulated herein.

1.1 "Personally Identifiable Information" (PII) refers to any representation of information that permits the identity of an individual to whom the information applies to be reasonably inferred by either direct or indirect means.

1.2 "Processing" implies any operation or set of operations which is performed on personal data or on sets of personal data, whether or not by automated means, such as collection, recording, organization, structuring, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination or otherwise making available, alignment or combination, restriction, erasure or destruction.`
    },
    {
      title: "ARTICLE II: DATA COLLECTION MECHANISMS",
      content: `2.1 Direct Acquisition: We collect data explicitly provided by the Data Subject pursuant to the creation of a user profile, including but not limited to legal nomenclature, electronic mail addresses, and authentication credentials.

2.2 Automated Surveillance: The Platform utilizes algorithmic tracking technologies, including persistent cookies and beacons, to aggregate telemetry regarding user interaction, device configuration, network latency, and User Agent strings.

2.3 Third-Party Integration: We may actively aggregate data from external authentication providers (e.g., Google OAuth) contingent upon Your authorization settings within said third-party infrastructures.`
    },
    {
      title: "ARTICLE III: LEGAL BASIS FOR PROCESSING",
      content: `3.1 Contractual Necessity: Processing is requisite for the performance of the Service Agreement to which the Data Subject is party.

3.2 Legitimate Interests: Data may be processed for purposes of fraud mitigation, network security diagnostics, and the optimization of proprietary algorithms, provided such interests are not overridden by the fundamental rights and freedoms of the Data Subject.

3.3 Compliance: Processing is mandated by applicable statutory obligations, including tax reporting (e.g., VAT/GST compliance) and law enforcement cooperation protocols.`
    },
    {
      title: "ARTICLE IV: TELEMETRY AND LOCAL STORAGE PROTOCOLS",
      content: `4.1 Cookies and Local Storage: The Platform employs "Cookies" (small text files placed on Your device) and HTML5 Local Storage to facilitate session management, preferences retention, and authentication persistence.

4.2 Analytical Scripts: We utilize proprietary and third-party scripts to collect non-PII metrics regarding traffic sources, dwell time, and click-through rates. You may disable these scripts via browser-level content blocking, though this may result in a degradation of Platform functionality.`
    },
    {
      title: "ARTICLE V: DATA RETENTION AND ARCHIVAL",
      content: `5.1 Temporal Limitation: PII shall not be retained longer than is necessary for the purposes for which the personal data are processed.

5.2 Archival Procedures: Upon account termination, data enters a "Soft Deletion" state for thirty (30) days, after which it is permanently expunged from production databases, notwithstanding residual copies existing in immutable backup archives for a period not exceeding seven (7) years for regulatory compliance and audit trails.`
    },
    {
      title: "ARTICLE VI: DISCLOSURE TO THIRD PARTIES",
      content: `6.1 We do not sell PII. However, disclosure may occur under the following circumstances:
(a) To sub-processors (e.g., cloud infrastructure providers, payment gateways) bound by strict Data Processing Agreements (DPAs);
(b) Pursuant to a valid court order, subpoena, or other legal process;
(c) In the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of the Data Controller's assets.`
    },
    {
      title: "ARTICLE VII: INTERNATIONAL DATA TRANSFERS",
      content: `7.1 Cross-Border Transmission: Information collected may be stored and processed in any country where We engage service providers. By using the Service, You consent to the transfer of information to countries outside of Your country of residence, including the United States, which may have data protection rules that differ from those of Your country.

7.2 Safeguards: All international transfers are conducted in accordance with Standard Contractual Clauses (SCCs) approved by the European Commission or equivalent mechanisms ensuring adequate levels of protection.`
    },
    {
      title: "ARTICLE VIII: INTELLECTUAL PROPERTY AND USER CONTENT",
      content: `8.1 User-Generated Content: While You retain copyright over the artistic works uploaded to the Platform, You grant Us a non-exclusive, worldwide, royalty-free license to display, reproduce, and adapt said content strictly for the purpose of operating and promoting the Service.

8.2 Metadata Ownership: Any metadata, tagging structures, or algorithmic categorizations derived from Your content processing shall remain the sole intellectual property of the Platform.`
    },
    {
      title: "ARTICLE IX: COMPLIANCE WITH COPPA (CHILDREN'S PRIVACY)",
      content: `9.1 Age Restriction: The Service is not directed to individuals under the age of thirteen (13). We do not knowingly collect PII from children under 13. If We become aware that a child under 13 has provided Us with PII, We will take steps to delete such information.

9.2 Parental Control: If You become aware that Your child has provided Us with Personal Data without Your consent, You must contact Us immediately at the provided legal channels.`
    },
    {
      title: "ARTICLE X: INDEMNIFICATION",
      content: `10.1 You agree to defend, indemnify, and hold harmless the Data Controller, its licensees, and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of a) Your use and access of the Service, or b) a breach of this Policy.`
    },
    {
      title: "ARTICLE XI: LIMITATION OF LIABILITY",
      content: `11.1 To the maximum extent permitted by applicable law, the Data Controller shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from unauthorized access to or use of our servers and/or any personal information stored therein.`
    },
    {
      title: "ARTICLE XII: GOVERNING LAW AND SEVERABILITY",
      content: `12.1 Jurisdiction: This Policy shall be governed and construed in accordance with the laws of the jurisdiction in which the Data Controller is incorporated, without regard to its conflict of law provisions.

12.2 Severability: If any provision of this Policy is held to be invalid or unenforceable by a court, the remaining provisions of this Policy will remain in effect.`
    }
  ];


  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-300 font-sans text-sm md:text-base">
      
      {/* HEADER: Clean, Left-Aligned Logo, Right-Aligned User */}
      <header className="fixed top-0 left-0 w-full h-16 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 z-50">
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

      {/* MAIN DOCUMENT CONTAINER */}
      <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
        
        {/* DOCUMENT TITLE */}
        <div className="mb-12 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-2 uppercase tracking-wide">Privacy Policy</h1>
          <p className="text-zinc-500 font-mono text-xs">
            Effective Date: {lastUpdated} | Document Ref: PD-LGL-2025-v2.0
          </p>
        </div>

        {/* CONTENT BLOCKS */}
        <div className="space-y-12">
          {policySections.map((section, index) => (
            <section key={index} className="flex flex-col gap-3">
              <h2 className="text-sm font-bold text-black dark:text-white uppercase tracking-wider">
                {section.title}
              </h2>
              <div className="text-zinc-700 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap text-justify selection:bg-zinc-200 dark:selection:bg-zinc-800">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* FOOTER BLOCK */}
        <div className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-xs text-zinc-500 mb-6 text-justify">
            NOTICE: This document constitutes a binding agreement between You and the Platform. We reserve the right to amend these terms at any time. Continued use of the Service following any changes signifies Your acceptance of the new terms. If you have inquiries regarding this document, specific legal rights, or compliance protocols, correspondence should be directed to our legal department via the designated channels.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 text-xs font-bold uppercase tracking-wide text-black dark:text-white">
            <a href="mailto:legal@painterdiary.com" className="hover:underline">Legal Contact</a>
            <Link to="/Legal/Terms" className="hover:underline">Terms of Service</Link>
            <Link to="/Legal/Cookies" className="hover:underline">Cookie Policy</Link>
          </div>
        </div>

      </main>
    </div>
    )
}

export default SecurityPolicy

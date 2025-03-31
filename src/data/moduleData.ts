import { Module, Question } from '@/types/learning';

// Mock questions for Conflict Resolution module
const conflictQuestions: Question[] = [
  {
    id: 'q1',
    type: 'drag-drop',
    questionText: 'Sort the actions, starting from the most appropriate to least appropriate response to this scenario.',
    items: [
      { id: 'item1', text: 'Hold a team meeting and remind everyone about the anti-bullying policies', category: 'appropriate' },
      { id: 'item2', text: 'Hold separate discreet meetings with the employees gossiping and the victim of the rumours to find out more about what is going on', category: 'appropriate' },
      { id: 'item3', text: 'Confront the employees gossiping', category: 'appropriate' }
    ],
    categories: ['appropriate']
  },
  {
    id: 'q2',
    type: 'multiple-choice',
    questionText: 'What is the most effective first step when dealing with team conflict?',
    choices: [
      { id: 'c1', text: 'Immediately discipline both parties', isCorrect: false },
      { id: 'c2', text: 'Listen to all parties involved separately', isCorrect: true },
      { id: 'c3', text: 'Ignore it and hope it resolves itself', isCorrect: false },
      { id: 'c4', text: 'Take the side of the more senior employee', isCorrect: false }
    ]
  },
  {
    id: 'q3',
    type: 'true-false',
    questionText: 'When resolving a conflict, it is always best to have all parties discuss the issue in a group setting.',
    correctAnswer: false
  }
];

// Mock questions for Disciplinary Meetings module
const disciplinaryQuestions: Question[] = [
  {
    id: 'q4',
    type: 'drag-drop',
    questionText: 'Which actions require a disciplinary meeting, a verbal warning, or no formal action at all?',
    items: [
      { id: 'item1', text: 'A team member is late twice in a week', category: 'verbal' },
      { id: 'item2', text: 'There is evidence of an employee threatening their colleague', category: 'disciplinary' },
      { id: 'item3', text: 'Turning up for work whilst intoxicated/on drugs', category: 'disciplinary' },
      { id: 'item4', text: 'A team member forgets to check their email inbox', category: 'none' },
      { id: 'item5', text: 'An employee has been posting protected customer data on social media', category: 'disciplinary' }
    ],
    categories: ['disciplinary', 'verbal', 'none']
  },
  {
    id: 'q5',
    type: 'multiple-choice',
    questionText: 'What is an essential element of a proper disciplinary meeting?',
    choices: [
      { id: 'c1', text: 'Having multiple managers present to intimidate the employee', isCorrect: false },
      { id: 'c2', text: 'Allowing the employee to bring a representative', isCorrect: true },
      { id: 'c3', text: 'Conducting the meeting in a public area', isCorrect: false },
      { id: 'c4', text: 'Making an immediate decision without investigation', isCorrect: false }
    ]
  }
];

// Mock questions for Data Security module
const securityQuestions: Question[] = [
  {
    id: 'q6',
    type: 'checkbox',
    questionText: 'What actions should you take in this scenario?',
    choices: [
      { id: 'c1', text: 'Reassure the team member', isCorrect: false },
      { id: 'c2', text: 'Notify clients about the data breach and what files have been accessed', isCorrect: true },
      { id: 'c3', text: 'Ask the employee to change their password', isCorrect: true },
      { id: 'c4', text: 'Remind the team of their data protection training', isCorrect: true }
    ]
  },
  {
    id: 'q7',
    type: 'true-false',
    questionText: 'If a data breach occurs, it is acceptable to delay reporting it if it might damage company reputation.',
    correctAnswer: false
  }
];

// Mock questions for Anti-fraud module
const fraudQuestions: Question[] = [
  {
    id: 'q8',
    type: 'drag-drop',
    questionText: 'Sort the statements into true or false.',
    items: [
      { id: 'item1', text: 'It\'s okay as it hasn\'t affected the quarterly budget too much', category: 'false' },
      { id: 'item2', text: 'Proof of this is viable for termination of employment', category: 'true' },
      { id: 'item3', text: 'This is grounds for a formal investigation', category: 'true' },
      { id: 'item4', text: 'This is a clear violation of our anti-fraud policy', category: 'true' },
      { id: 'item5', text: 'The colleague was wrong to report their peer', category: 'false' }
    ],
    categories: ['true', 'false']
  },
  {
    id: 'q9',
    type: 'multiple-choice',
    questionText: 'If you suspect fraudulent activity in your team, what should be your first action?',
    choices: [
      { id: 'c1', text: 'Confront the suspected employee directly', isCorrect: false },
      { id: 'c2', text: 'Gather evidence and document your observations', isCorrect: true },
      { id: 'c3', text: 'Discuss your suspicions with other team members', isCorrect: false },
      { id: 'c4', text: 'Ignore it if the amounts are small', isCorrect: false }
    ]
  }
];

// Mock questions for Prioritizing Tasks module
const prioritizingQuestions: Question[] = [
  {
    id: 'q10',
    type: 'multiple-choice',
    questionText: 'Which prioritization technique helps categorize tasks into Must have, Should have, Could have, and Won\'t have?',
    choices: [
      { id: 'c1', text: 'Kanban method', isCorrect: false },
      { id: 'c2', text: 'MoSCoW method', isCorrect: true },
      { id: 'c3', text: 'Eisenhower matrix', isCorrect: false },
      { id: 'c4', text: 'Pareto principle', isCorrect: false }
    ]
  },
  {
    id: 'q11',
    type: 'drag-drop',
    questionText: 'Sort these items into their correct MoSCoW categories:',
    items: [
      { id: 'item1', text: 'Core login functionality', category: 'must' },
      { id: 'item2', text: 'Dark mode theme option', category: 'could' },
      { id: 'item3', text: 'User profile settings', category: 'should' },
      { id: 'item4', text: 'Advanced analytics dashboard', category: 'wont' },
      { id: 'item5', text: 'Basic security features', category: 'must' }
    ],
    categories: ['must', 'should', 'could', 'wont']
  },
  {
    id: 'q12',
    type: 'true-false',
    questionText: 'When using the MoSCoW method, "Could have" items should be completed before "Should have" items.',
    correctAnswer: false
  }
];

// Mock modules
export const modules: Module[] = [
  {
    id: 'module1',
    title: 'Conflict Resolution for Managers',
    description: 'Learn effective strategies to manage team conflicts professionally and productively.',
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    sections: [
      {
        id: 'section1',
        title: 'Understanding Conflict Types',
        content: `Workplace conflicts arise from various sources and understanding the type of conflict is crucial for effective resolution. There are five main types of conflicts managers typically encounter:

1. **Relationship Conflicts**: These stem from interpersonal tensions, personality clashes, or miscommunication between team members. They often involve negative emotions and can be highly destructive if not addressed promptly.

2. **Task Conflicts**: These arise when team members have different views on how to complete specific work assignments or projects. Unlike relationship conflicts, task conflicts can be productive when managed properly, as they can lead to better solutions.

3. **Process Conflicts**: These occur when there are disagreements about how work should be done, who should do what, and how resources should be allocated.

4. **Status Conflicts**: These emerge when there's a perceived or actual disparity in status among team members, especially when roles are unclear or when reorganization occurs.

5. **Value Conflicts**: These happen when team members have fundamentally different beliefs, values, or ethical stances that affect workplace decisions or interactions.

As a manager, your first step in conflict resolution is accurately identifying the type of conflict at play. Each type requires a different approach and resolution strategy. Remember that conflicts left unaddressed often escalate and can significantly impact team performance, morale, and organizational culture.`,
        questions: []
      },
      {
        id: 'section2',
        title: 'Rumour Management',
        content: `Workplace gossip and rumors can quickly undermine team cohesion and create a toxic environment. As a manager, addressing rumors requires tact, confidentiality, and a systematic approach:

**Understanding the Impact of Rumors:**
Rumors can damage reputations, erode trust, decrease productivity, and cause unnecessary stress. They often emerge during periods of change or uncertainty when official communication is lacking.

**Effective Strategies for Managing Rumors:**

1. **Investigate the Source**: Before taking action, discreetly determine the origin and spread of the rumor. This helps you understand its scope and potential impact.

2. **Address Rumors Promptly**: The longer a rumor circulates, the more damage it can cause. Swift intervention is essential.

3. **Have One-on-One Conversations**: Meet privately with individuals involved in spreading rumors. Approach these conversations with curiosity rather than accusation.

4. **Provide Clear, Accurate Information**: Combat misinformation with facts. When appropriate, share correct information through official channels.

5. **Establish Expectations**: Clearly communicate your expectations regarding professional communication and the consequences of harmful gossip.

6. **Create a Culture of Open Communication**: Foster an environment where team members feel comfortable bringing concerns directly to management rather than discussing them informally.

7. **Address Underlying Issues**: Rumors often point to deeper organizational issues. Use them as indicators of what might need attention in your team or company.

Remember, your goal is not to eliminate all informal communication, which is a natural part of workplace social dynamics, but to prevent harmful rumors that damage trust and morale.`,
        videoUrl: 'https://example.com/videos/rumor-management.mp4',
        questions: conflictQuestions
      }
    ],
    difficulty: 'intermediate',
    estimatedMinutes: 45,
    xpReward: 200
  },
  {
    id: 'module2',
    title: 'Disciplinary Meetings',
    description: 'Guide to conducting fair and effective disciplinary meetings with team members.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80',
    sections: [
      {
        id: 'section3',
        title: 'Preparation and Documentation',
        content: `Proper preparation is crucial for conducting fair and effective disciplinary meetings. This structured approach ensures you're legally compliant and professionally sound in your handling of workplace issues.

**Essential Preparation Steps:**

1. **Gather and Review Evidence:** 
   - Collect all relevant documentation (emails, performance records, witness statements)
   - Review company policies and procedures that apply to the situation
   - Verify facts with multiple sources when possible
   - Document dates, times, and details of incidents

2. **Understand Policy Framework:**
   - Review your organization's disciplinary policy and procedures
   - Consult relevant employment laws and regulations
   - Determine the appropriate level of disciplinary action based on:
     * Severity of the issue
     * Previous incidents and warnings
     * Mitigating circumstances
     * Precedents from similar cases

3. **Plan the Meeting Structure:**
   - Prepare an agenda for the meeting
   - Decide who should be present (HR representative, note-taker, witness)
   - Arrange for a private, confidential space
   - Allow sufficient time without interruptions
   - Prepare specific questions to ask the employee

4. **Documentation Templates:**
   - Prepare disciplinary action forms
   - Create a template for meeting minutes
   - Have performance improvement plan documents ready if needed

5. **Notification to the Employee:**
   - Provide written notice of the meeting with sufficient advance warning
   - Clearly state the purpose of the meeting and the issues to be discussed
   - Inform the employee of their right to bring a representative

Remember, thorough preparation not only protects the organization legally but also ensures fairness to the employee and increases the likelihood of a constructive outcome.`,
        questions: []
      },
      {
        id: 'section4',
        title: 'Meeting Structure',
        content: `A well-structured disciplinary meeting ensures procedural fairness and clarity for all parties involved. Following a consistent format helps maintain professionalism and reduces the risk of emotional escalation.

**Recommended Meeting Structure:**

1. **Opening (5-10 minutes)**
   - Welcome all parties and make introductions
   - Explain the purpose of the meeting and its format
   - Confirm the employee understands the allegations against them
   - Clarify that notes will be taken and outline next steps

2. **Presentation of Concerns (10-15 minutes)**
   - Clearly state the specific issue(s) or policy violations
   - Present the evidence you've gathered
   - Reference relevant company policies or procedures
   - Avoid judgmental language or personal criticisms

3. **Employee Response (15-20 minutes)**
   - Allow the employee to respond to each concern raised
   - Listen actively without interrupting
   - Ask clarifying questions
   - Consider any new information or evidence they present

4. **Discussion (10-15 minutes)**
   - Review any discrepancies between accounts
   - Ask additional questions to clarify understanding
   - Consider mitigating factors or explanations
   - Take a break if emotions run high or more information needs to be gathered

5. **Outcome and Next Steps (10 minutes)**
   - If possible, communicate the decision and rationale
   - If more time is needed for deliberation, explain next steps and timeline
   - Clearly outline any consequences or expectations moving forward
   - Discuss a performance improvement plan if appropriate

6. **Closing (5 minutes)**
   - Summarize the key points discussed
   - Confirm understanding of next steps and expectations
   - Provide information about the appeals process
   - End professionally regardless of the outcome

**Additional Best Practices:**
- Maintain a calm, objective tone throughout
- Document all key points and decisions
- Provide written confirmation of the outcome within an agreed timeframe
- Schedule follow-up meetings as necessary
- Ensure confidentiality is maintained by all parties

Remember that disciplinary meetings, while sometimes difficult, can be opportunities for growth and improved performance when conducted properly.`,
        videoUrl: 'https://example.com/videos/disciplinary-structure.mp4',
        questions: disciplinaryQuestions
      }
    ],
    difficulty: 'advanced',
    estimatedMinutes: 60,
    xpReward: 250
  },
  {
    id: 'module3',
    title: 'Data Security for Teams',
    description: 'Essential practices for maintaining data security and responding to breaches.',
    imageUrl: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    sections: [
      {
        id: 'section5',
        title: 'Preventing Data Breaches',
        content: `Data security is a shared responsibility that requires vigilance from every team member. Implementing these preventative measures can significantly reduce the risk of data breaches and protect sensitive information.

**Essential Preventative Measures:**

1. **Strong Password Practices:**
   - Use complex passwords with at least 12 characters including letters, numbers, and symbols
   - Implement multi-factor authentication for all accounts
   - Change passwords every 90 days
   - Never share passwords or write them down
   - Use a secure password manager

2. **Email Security:**
   - Verify sender addresses before opening attachments or clicking links
   - Be cautious of unexpected emails requesting sensitive information
   - Never send confidential information via unsecured email
   - Use encryption for sensitive communications
   - Report suspicious emails to IT immediately

3. **Device Security:**
   - Keep all software and operating systems updated
   - Install and maintain antivirus and anti-malware software
   - Lock devices when unattended (use auto-lock features)
   - Never leave devices unsupervised in public places
   - Secure home networks when working remotely

4. **Data Handling Protocols:**
   - Follow the principle of least privilege—access only what you need
   - Properly dispose of physical documents using shredders
   - Securely delete digital files and sanitize storage before disposal
   - Use secure file transfer methods for sharing data
   - Be mindful of visible screens when working in public spaces

5. **Regular Training and Awareness:**
   - Participate in all security training offered by your organization
   - Stay informed about latest security threats and phishing techniques
   - Practice identifying phishing attempts
   - Understand data classification protocols
   - Know the incident reporting procedures

6. **Technical Safeguards:**
   - Use VPNs when accessing company resources remotely
   - Encrypt sensitive data and communications
   - Avoid using public Wi-Fi for sensitive work
   - Keep personal and work accounts separate
   - Use approved cloud storage solutions only

By consistently applying these preventative measures, teams can create a strong security culture that protects both the organization and its clients from data breaches.`,
        questions: []
      },
      {
        id: 'section6',
        title: 'Responding to Security Incidents',
        content: `When a security incident occurs, a rapid and appropriate response is essential to minimize damage, meet compliance requirements, and restore normal operations. This section outlines the critical steps managers should take when faced with a data breach or security incident.

**Incident Response Protocol:**

1. **Initial Detection and Containment (First 24 Hours):**
   - Identify and document the nature and scope of the breach
   - Isolate affected systems to prevent further data loss
   - Preserve evidence for investigation and potential legal proceedings
   - Activate your incident response team
   - Document all actions taken with timestamps

2. **Assessment and Investigation (24-72 Hours):**
   - Determine what data was compromised and its sensitivity
   - Identify how the breach occurred and who was affected
   - Assess the potential impact on individuals and the organization
   - Document findings in detail for reporting purposes
   - Consult legal counsel regarding disclosure obligations

3. **Notification Process (72 Hours+):**
   - Notify appropriate authorities according to relevant laws (e.g., GDPR requires notification within 72 hours)
   - Prepare clear communications for affected individuals
   - Include in notifications:
     * Description of the incident
     * Types of data compromised
     * Steps being taken in response
     * Recommendations for affected individuals
     * Contact information for questions

4. **Remediation and Recovery:**
   - Patch vulnerabilities that led to the breach
   - Restore systems from clean backups after verification
   - Reset all credentials and access tokens
   - Implement additional security controls as needed
   - Monitor for any continued unauthorized access

5. **Post-Incident Activities:**
   - Conduct a thorough post-mortem analysis
   - Update security policies and procedures based on lessons learned
   - Provide additional training to staff
   - Test improved security measures
   - Prepare a comprehensive incident report

**Managerial Responsibilities:**
- Ensure clear communication throughout the organization
- Coordinate with IT, legal, PR, and executive teams
- Make critical decisions about operations during recovery
- Manage customer and stakeholder relationships
- Ensure regulatory compliance throughout the process

Remember that the goal of incident response is not just to recover from the current incident but to strengthen your security posture to prevent future breaches.`,
        videoUrl: 'https://example.com/videos/security-response.mp4',
        questions: securityQuestions
      }
    ],
    difficulty: 'intermediate',
    estimatedMinutes: 50,
    xpReward: 220
  },
  {
    id: 'module4',
    title: 'Fraud Prevention and Reporting',
    description: 'Understanding anti-fraud measures and proper reporting procedures.',
    imageUrl: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    sections: [
      {
        id: 'section7',
        title: 'Recognizing Fraud Indicators',
        content: `Workplace fraud can take many forms and often presents subtle warning signs before significant damage occurs. Learning to identify these indicators is a critical skill for managers and can help protect organizational assets and integrity.

**Common Types of Workplace Fraud:**

1. **Asset Misappropriation:**
   - Theft of cash, inventory, or supplies
   - Fraudulent expense reimbursements
   - Check tampering or payment manipulation
   - Payroll fraud (ghost employees, falsified hours)

2. **Financial Statement Fraud:**
   - Falsification of financial records
   - Revenue recognition manipulation
   - Hiding expenses or liabilities
   - Improper asset valuation

3. **Corruption:**
   - Bribery and kickbacks
   - Conflicts of interest
   - Bid rigging
   - Illegal gratuities

**Key Warning Signs to Watch For:**

1. **Financial Irregularities:**
   - Unexplained variances in accounts
   - Unusual or poorly documented transactions
   - Delays in providing financial information
   - Excessive voids or adjustments
   - Missing documents or records

2. **Behavioral Indicators:**
   - Lifestyle changes inconsistent with salary
   - Unwillingness to share duties or take vacation
   - Unusually close relationships with vendors/clients
   - Defensiveness when questioned about processes
   - Working unusual hours when others aren't present

3. **Process Red Flags:**
   - Override of established controls
   - Excessive rush transactions or emergency procedures
   - Unusual system access patterns
   - Resistance to process improvements or audits
   - Preference for dealing with a single vendor

4. **Document Warning Signs:**
   - Photocopied or altered documents
   - Missing approvals or signatures
   - Sequential invoices from the same vendor
   - Addresses of vendors matching employee addresses
   - Rounded-sum invoices or payments

**Industry-Specific Indicators:**
- Healthcare: Unusual billing patterns or coding anomalies
- Retail: Inventory shrinkage exceeding industry norms
- Financial services: Account activity inconsistent with customer profile
- Construction: Significant cost overruns without adequate explanation

Remember that the presence of one or more of these indicators doesn't automatically prove fraud but should trigger increased vigilance and possibly further investigation.`,
        questions: []
      },
      {
        id: 'section8',
        title: 'Reporting Procedures',
        content: `Proper documentation and reporting are essential when addressing potential fraud. Following established protocols ensures that suspected fraud is handled appropriately, evidence is preserved, and the organization's response is compliant with relevant regulations.

**Standard Reporting Protocol:**

1. **Initial Documentation:**
   - Record your observations in writing as soon as possible
   - Include specific details: dates, times, locations, people involved
   - Document what you observed directly versus what was reported to you
   - Note any witnesses or corroborating evidence
   - Avoid speculation or conclusions in your documentation

2. **Reporting Channels:**
   - Follow your organization's established reporting hierarchy:
     * Direct supervisor (unless they're implicated)
     * Human Resources department
     * Compliance officer
     * Ethics hotline or anonymous reporting system
     * Audit committee
   - If internal channels are compromised, consider:
     * Higher-level management
     * Board of directors
     * External auditors
     * Regulatory authorities (as a last resort)

3. **Report Content Requirements:**
   - Clearly state what was observed/discovered
   - Provide all relevant documentation and evidence
   - Identify potential witnesses
   - Explain why you believe the activity is suspicious
   - Disclose any relevant relationships or conflicts

4. **Confidentiality Considerations:**
   - Share information only with authorized personnel
   - Protect the identity of whistleblowers
   - Secure all documentation related to the suspicion
   - Follow data protection regulations when handling sensitive information
   - Understand and respect the "need to know" principle

5. **Follow-up Procedures:**
   - Document all communications related to your report
   - Maintain a log of who you spoke with and when
   - Follow up appropriately if no action is taken
   - Be prepared to provide additional information if requested
   - Understand your protections under whistleblower laws

**Manager's Responsibilities Upon Receiving a Report:**
- Take all reports seriously and thank the reporter
- Document the receipt of the report and actions taken
- Escalate to appropriate parties without delay
- Maintain confidentiality and protect against retaliation
- Do not attempt to investigate complex fraud alone
- Consult with legal counsel early in the process

Remember that prompt, proper reporting of suspected fraud is not just an ethical obligation but often a legal requirement. Organizations that establish clear, accessible reporting procedures and protect whistleblowers are more likely to detect fraud early and minimize damage.`,
        videoUrl: 'https://example.com/videos/fraud-reporting.mp4',
        questions: fraudQuestions
      }
    ],
    difficulty: 'intermediate',
    estimatedMinutes: 40,
    xpReward: 180
  },
  {
    id: 'module5',
    title: 'Prioritizing Tasks as a Scrum Master',
    description: 'Learn effective strategies for prioritizing tasks using MoSCoW, business value, and delegation techniques.',
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    sections: [
      {
        id: 'section9',
        title: 'MoSCoW Prioritization',
        content: `The MoSCoW method is a powerful prioritization technique that helps Scrum Masters and teams make decisions about which requirements and tasks should be addressed first based on their relative importance.

**Understanding MoSCoW Categories:**

1. **Must Have (M):**
   - Critical to the current delivery timeframe
   - Non-negotiable features or requirements
   - Without these, the product or increment would fail
   - Typically only 20% of requirements should be in this category
   - Examples: Core login functionality, critical security features, primary user journeys

2. **Should Have (S):**
   - Important but not vital for the current iteration
   - These are essential features that can be delivered in a different way temporarily
   - Painful to leave out, but the solution is still viable without them
   - Examples: Optimization features, secondary user flows, important but not critical integrations

3. **Could Have (C):**
   - Desirable but not necessary
   - Will only be included if time and resources permit
   - Usually the first items to be deprioritized if timeline pressures occur
   - Often "nice-to-have" features that improve user experience
   - Examples: UI enhancements, additional reporting capabilities, extra customization options

4. **Won't Have (W) (this time):**
   - Recognized as requirements for the future
   - Explicitly excluded from the current delivery timeframe
   - Set correct stakeholder expectations that these items won't be delivered now
   - Keep these items visible on the backlog for future consideration
   - Examples: Future planned features, items requiring further research, lower-value enhancements

**Implementing MoSCoW Effectively:**

1. **Collaborate on Categorization:**
   - Involve the entire team in the prioritization process
   - Include stakeholder input but maintain team autonomy
   - Challenge each other's assumptions about what constitutes a "must-have"

2. **Review Regularly:**
   - Reassess priorities at the start of each sprint
   - Be willing to recategorize items as circumstances change
   - Maintain the discipline of keeping "must-haves" to only 20% of total requirements

3. **Communicate Clearly:**
   - Ensure all stakeholders understand the MoSCoW categories
   - Clearly document and share prioritization decisions
   - Explain the rationale behind categorizations

4. **Link to Business Value:**
   - Tie MoSCoW categories to clear business objectives
   - Quantify the value of each category when possible
   - Use data to support prioritization decisions

The MoSCoW method works particularly well in agile environments because it acknowledges the reality of fixed timescales while providing a simple framework for making tough prioritization decisions. It helps teams deliver maximum value within constraints and maintains transparency around what will and won't be delivered.`,
        questions: []
      },
      {
        id: 'section10',
        title: 'Business Value Assessment',
        content: `Assessing business value is a critical skill for Scrum Masters to ensure team efforts align with organizational goals. This systematic approach helps prioritize tasks based on their potential return on investment and strategic importance.

**Business Value Assessment Framework:**

1. **Quantitative Value Metrics:**
   - **Revenue Impact:** How will this task directly affect revenue?
     * New revenue generation
     * Increased conversion rates
     * Higher average order value
     * Improved customer retention

   - **Cost Reduction:** Will this task lower operational costs?
     * Decreased support requests
     * Reduced development time
     * Lower infrastructure costs
     * Automation of manual processes

   - **Time Savings:** How much time will this save users or the organization?
     * Reduced task completion time
     * Fewer required steps
     * Automation of repetitive tasks
     * Streamlined workflows

2. **Qualitative Value Considerations:**
   - **Strategic Alignment:** How does this task support key organizational goals?
   - **Customer Satisfaction:** Will this significantly improve user experience?
   - **Competitive Advantage:** Does this provide differentiation in the market?
   - **Risk Mitigation:** Does this address significant business or technical risks?
   - **Learning Value:** Will this provide valuable insights for future development?

3. **Relative Valuation Techniques:**
   - **Value Poker:** Team members assign points to represent relative business value
   - **$100 Test:** Distribute a theoretical $100 across features to indicate priority
   - **2x2 Matrix:** Plot items on axes of effort vs. value
   - **Weighted Scoring:** Assess multiple value criteria with weighted importance

4. **Validation Methods:**
   - **A/B Testing:** Test assumptions about business value with real users
   - **Minimum Viable Products (MVPs):** Validate value before full implementation
   - **Customer Interviews:** Gather direct feedback on perceived value
   - **Usage Analytics:** Measure actual value delivered by similar features

**Implementation Process:**

1. **Preparation:**
   - Identify key stakeholders who can assess business value
   - Gather necessary data to inform value assessments
   - Prepare clear descriptions of each feature or task

2. **Assessment Workshop:**
   - Bring stakeholders together for collaborative evaluation
   - Present each item with available supporting data
   - Facilitate discussion to reach consensus on value ratings
   - Document rationale for assigned values

3. **Prioritization:**
   - Combine business value ratings with effort estimates
   - Calculate ROI (value divided by effort)
   - Create prioritized backlog based on ROI and strategic factors
   - Address dependencies and sequencing requirements

4. **Review and Adapt:**
   - Regularly reassess business value assumptions
   - Track actual delivered value against predictions
   - Refine estimation process based on outcomes
   - Adjust prioritization as business conditions change

By systematically assessing business value, Scrum Masters can help teams make informed decisions about where to focus their efforts for maximum impact and organizational benefit.`,
        videoUrl: 'https://example.com/videos/business-value.mp4',
        questions: prioritizingQuestions
      }
    ],
    difficulty: 'beginner',
    estimatedMinutes: 35,
    xpReward: 150
  }
];

// User progress mock data
export const userProgress = {
  completedModules: ['module1'],
  inProgressModules: ['module2'],
  xpPoints: 1250,
  level: 3,
  badges: [
    { id: 'badge1', name: 'First Module', description: 'Completed your first module', iconUrl: '🏆', earnedAt: new Date(2023, 5, 15) },
    { id: 'badge2', name: 'Perfect Quiz', description: 'Scored 100% on a quiz', iconUrl: '🎯', earnedAt: new Date(2023, 5, 20) },
    { id: 'badge3', name: 'Fast Learner', description: 'Completed a module in record time', iconUrl: '⚡', earnedAt: new Date(2023, 6, 1) }
  ]
};

// Leaderboard mock data
export const leaderboardData = [
  { userId: 'user1', name: 'John Doe', xpPoints: 1250, level: 3, recentBadges: userProgress.badges },
  { userId: 'user2', name: 'Jane Smith', xpPoints: 1820, level: 4, recentBadges: [] },
  { userId: 'user3', name: 'Robert Johnson', xpPoints: 2150, level: 5, recentBadges: [] },
  { userId: 'user4', name: 'Emily Wilson', xpPoints: 980, level: 2, recentBadges: [] },
  { userId: 'user5', name: 'Michael Brown', xpPoints: 1540, level: 3, recentBadges: [] },
  { userId: 'user6', name: 'Sarah Davis', xpPoints: 3200, level: 7, recentBadges: [] },
  { userId: 'user7', name: 'James Miller', xpPoints: 2780, level: 6, recentBadges: [] },
  { userId: 'user8', name: 'Jennifer Wilson', xpPoints: 1120, level: 3, recentBadges: [] },
  { userId: 'user9', name: 'David Taylor', xpPoints: 890, level: 2, recentBadges: [] },
  { userId: 'user10', name: 'Lisa Anderson', xpPoints: 2400, level: 5, recentBadges: [] }
];

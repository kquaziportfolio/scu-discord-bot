const request = require(`request`);
const cheerio = require(`cheerio`);
const config = require('../config.json');
const { MessageEmbed } = require(`discord.js`);

module.exports = {
    name: "scraper",
	description: "Scrape online documents for content!",
	usage: `${config.prefix}scraper [url] [title element] [description element]`,
    async execute (message, args) {
		message.delete();
		
		const prompt = message.content.split(" ");
		if(!prompt[1] || !prompt[3]) return message.channel.send({embed: { description: "Please enter all arguments: `{url}` `{title element}` `{description element}`", color: 10231598}})
        request(prompt[1], (error, response, html) => {
			if (!error && response.statusCode == 200) {
				const $ = cheerio.load(html);
				const title = $(prompt[2]).text();
				const content = $(prompt[3]).text(); 
				//const logo = $("link[rel='icon']").attr("href");

				const scraperEmbed = new MessageEmbed() 
					.setTitle(title)
					.setDescription(content)
					.setColor(config.school_color)
					//.setThumbnail(logo)

				if (content.length > 2048) {
					const firstEmbed = content.substring(0, 2047);
					const secondEmbed = content.substring(2048, content.length);
					const combinedEmbed = {
						title: title,
						description: firstEmbed + secondEmbed,
					};
					message.channel.send(combinedEmbed);
				} else {
					message.channel.send(scraperEmbed);
				}
			}
        });
    }
}
/*
<div class="accordion mt-3" id="catalogList84733" data-children=".accordion-item">
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse061492" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>10 : Introduction to Programming</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse061492" class="collapse" role="tabpanel" style="">
			<p>Overview of computing. Introduction to program design and implementation: problem definition, functional decomposition, and design of algorithm programming in PHP and C: variables, data types, control constructs, arrays, strings, and functions. Program development in the Linux environment: editing, compiling, testing, and debugging. Credit is not allowed for more than one introductory class such as COEN 10, COEN 44, CSCI 10, or OMIS 30. Co-requisite: COEN 10L. (4 units)
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse063746" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>10L : Introduction to Programming Lab</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse063746" class="collapse" role="tabpanel" style="">
			<p>Laboratory for COEN 10. Co-requisite: COEN 10. (1 Unit)
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse061743" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>11 : Advanced Programming</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse061743" class="collapse" role="tabpanel" style="">
			<p>The C Language: structure and style. Types, operators, and expressions. Control flow. Functions. Pointers, arrays, and strings. Structures and dynamic memory allocation. I/O and file processing. Special operators. Recursion and threads. The Unix environment.Prerequisites: Previous programming experience and/or a grade of C- or better in an introductory computer programming course such as COEN 10, CSCI 10, or OMIS 30. Co-requisite: COEN 11L. (4 units)
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse063786" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>11L : Advanced Programming Lab</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse063786" class="collapse" role="tabpanel" style="">
			<p>Laboratory for COEN 11. Co-requisite: COEN 11. (1 Unit)
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse061742" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>12 : Abstract Data Types &amp; Structures</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse061742" class="collapse" role="tabpanel" style="">
			<p>Data abstraction: abstract data types, information hiding, interface specification. Basic data structures: stacks, queues, lists, binary trees, hashing, tables, graphs; implementation of abstract data types in the C language. Internal sorting: review of selection, insertion, and exchange sorts; quicksort, heapsort; recursion. Analysis of run-time behavior of algorithms; Big-O notation. Introduction to classes in C++. Prerequisite: A grade of C- or better in either COEN 11 or COEN 44. Co-requisite: COEN 12L. Recommended Co-requisite: COEN 19 or MATH 51. (4 units)
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse063787" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>12L : Abstract Data Types &amp; Structures Lab</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse063787" class="collapse" role="tabpanel" style="">
			<p>Laboratory for COEN 12. Co-requisite: COEN 12. (1 Unit)
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse010813" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>19 : Discrete Mathematics</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse010813" class="collapse" role="tabpanel" style="">
			<p>Predicate logic, methods of proof, sets, functions, sequences and summations, modular arithmetic, cardinality, induction, elementary combinatorial analysis, recursion, and relations.   Also listed as MATH 51. (4 units)
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse061643" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>20L : Embedded Systems Laboratpry</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse061643" class="collapse" role="tabpanel" style="">
			<p>Laboratory for COEN 20. Co-requisite: COEN 20. (1 Unit)
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse010814" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>20 : Introduction to Embedded Systems</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse010814" class="collapse" role="tabpanel" style="">
			<p>Introduction to computer organization: CPU, registers, buses, memory, I/O interfaces. Number systems: arithmetic and information representation. Assembly language programming: addressing techniques, arithmetic and logic operations, branching and looping, stack operations, procedure calls, parameter passing, and interrupts. C language programming: pointers, memory management, stack frames, interrupt processing. Prerequisite: A grade of C- or better in COEN 12 or CSCI 61. (4 Units)
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse010815" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>21 : Introduction to Logic Design</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse010815" class="collapse" role="tabpanel" style="">
			<p>Boolean functions and their minimization. Designing combinational circuits, adders, multipliers, multiplexers, decoders. Noise margin, propagation delay. Bussing. Memory elements: latches and flip-flops; timing; registers; counters. Programmable logic, PLD, and FPGA. Use of industry quality CAD tools for schematic capture and HDL in conjunction with FPGAs. Also listed as ELEN 21. Co-requisite: COEN 21L. (4 Units)
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse010817" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>21L : Logic Design Lab</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse010817" class="collapse" role="tabpanel" style="">
			<p>Laboratory for COEN 21. Co-requisite: COEN 21. (1 Unit)
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse010822" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>44 : Applied Programming in C</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse010822" class="collapse" role="tabpanel" style="">
			<p>Computer programming in C, including input/output, selection structures, loops, iterative solutions, function definition and invocation, macros, pointers, memory allocation, and top-down design. Programming of elementary mathematical operations. Applications to engineering problems. Prerequisite: MATH 13. Co-requisite: COEN 44L. (4 Units)
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse063788" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>44L : Applied Programming in C Lab</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse063788" class="collapse" role="tabpanel" style="">
			<p>Laboratory for COEN 44.  Co-requisite: COEN 44. (1 Unit)
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse063292" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>45 : Applied Programming in MATLAB</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse063292" class="collapse" role="tabpanel" style="">
			<p>Computer programming in MATLAB, including input/output, selection structures, loops, iterative solutions, function definition and invocation, top-down design. Programming of elementary mathematical operations. Applications to engineering problems. Prerequisite: MATH 13. Co-requisite: COEN 45L.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse063789" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>45L : Applied Programming in MATLAB Lab</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse063789" class="collapse" role="tabpanel" style="">
			<p>Laboratory for COEN 45. Co-requisite: COEN 45.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse010827" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>79 : Object-Oriented Programming and Advanced Data Structures</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse010827" class="collapse" role="tabpanel" style="">
			<p>Object-oriented programming concepts; specification, design, and implementation of data structures with emphasis on software reliability and reusability; Design and implementation of static and dynamic data structures such as bag, sequence, vector, list, stack, queue, deque, priority queue, set, multiset, map, multimap, and graphs; Software
development using inheritance, templates and iterators; Memory allocation and performance; Using datastructures in real-world applications; Time analysis of data structures; Informal use of specifications to guide implementation and validation of programs. Prerequisites: A grade of C- or better in either COEN 12 or CSCI 61 and in either COEN 19 or MATH 51. Co-requisite: COEN 79L. (4 units)"
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse065425" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>79L : Object-Oriented Programming and Data Structures Laboratory</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse065425" class="collapse" role="tabpanel" style="">
			<p>Laboratory for COEN 79.  Co-requisite: COEN 79. (1 Unit)
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse065402" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>100 : Research Seminar</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse065402" class="collapse" role="tabpanel" style="">
			<p>Introduction to research in computing, covering several research areas. (1 unit)
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse010837" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>122 : Computer Architecture</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse010837" class="collapse" role="tabpanel" style="">
			<p>Overview of computer systems. Instruction set architecture. Computer arithmetic. CPU datapath design. CPU control design.  Pipelining. Data/control hazards. Memory hierarchies and management.  Introduction of multiprocessor systems. Hardware description languages. Laboratory project consists of a design of a CPU. Prerequisites: A grade of C- or better in either COEN 20 or ELEN 33 and in either COEN 21 or ELEN 21. Co-requisite: COEN 122L. (4 Units)
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse063791" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>122L : Computer Architecture Lab</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse063791" class="collapse" role="tabpanel" style="">
			<p>Laboratory for COEN 122. Co-requisite: COEN 122. (1 Unit)
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse064893" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>123 : Mechatronics</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse064893" class="collapse" role="tabpanel" style="">
			<p>Introduction to the behavior, design, and integration of electromechanical components and systems. Review of appropriate electronic components/circuitry, mechanism configurations, and programming constructs. Use and integration of transducers, microcontrollers, and actuators. Prereq: ELEN 50 with a grade of C- or better and COEN 11 or 44. Also listed as MECH 143 and ELEN 123.  Co-requisite: COEN 123L.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse064894" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>123L : Mechatronics Lab</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse064894" class="collapse" role="tabpanel" style="">
			<p>Laboratory for COEN 123. Also listed as MECH 143L and ELEN 123L. Co-requisite: COEN 123.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse010846" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>127 : Advanced Logic Design</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse010846" class="collapse" role="tabpanel" style="">
			<p>Contemporary design of finite-state machines as system controllers using MSI, PLDS, or FPGA devices. Minimization techniques, performance analysis, and modular system design. HDL simulation and synthesis. Also listed as ELEN 127. Prerequisite: COEN 21; Co-requisite: COEN 127L and ELEN 115.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse010851" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>127L : Advanced Logic Design Lab</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse010851" class="collapse" role="tabpanel" style="">
			<p>Laboratory for COEN 127. Design, construction, and testing of controllers from verbal specs. Use of CAD design tools. Also listed as ELEN 127L. Co-requisite: COEN 127.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse010853" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>129 : Current Topics in Computer Engineering</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse010853" class="collapse" role="tabpanel" style="">
			<p>Subjects of current interest. May be taken more than once if topics differ.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse077654" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>129L : Current Topics in Computer Science and Engineering Laboratory</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse077654" class="collapse" role="tabpanel" style="">
			<p>Laboratory for COEN 129. Co-requisite: COEN 129.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse077663" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>140L : Machine Learning &amp; Data Mining</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse077663" class="collapse" role="tabpanel" style="">
			<p>Laboratory for COEN 140. CO-requisite: COEN 140.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse065313" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>140 : Machine Learning and Data Mining</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse065313" class="collapse" role="tabpanel" style="">
			<p>Machine learning as a field has become increasingly pervasive, with applications from the web (search, advertisements, and recommendation) to national security, from analyzing biochemical interactions to traffic and emissions to astrophysics. This course presents an introduction to machine learning and data mining, the study of computing systems that improve their performance through learning from data. This course is designed to cover the main principles, algorithms, and applications of machine learning and data mining.  Prerequisite: A grade of C- or better in AMTH 108, MATH 53, and COEN 12.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse010859" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>145 : Introduction to Paralell Computing</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse010859" class="collapse" role="tabpanel" style="">
			<p>How to effectively program parallel computers, from smartphones to large clusters. Types of parallel architectures, routing, data parallel, shared-memory, and message-passing parallel programming, load balancing, evaluation of parallel algorithms, advanced topics. Case studies in real-world data analytics, including parallel algorithms for sparse matrix and graph operations. Hands-on lab on multi-core CPUs and many-core GPUs. Prerequisites: a grade of C- or better in either COEN 12 or CSCI 61. Corequisite: COEN 145L. (4 units)
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse063792" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>145L : Introduction to Parallel Computing Lab</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse063792" class="collapse" role="tabpanel" style="">
			<p>Laboratory for COEN 145.  Corequisite: COEN 145. (1 unit)
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse010860" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>146 : Computer Networks</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse010860" class="collapse" role="tabpanel" style="">
			<p>Data Communication: circuit and packet switching, latency and bandwidth, throughput/delay analysis. Application Layer: client/server model, socket programming, Web, e-mail, FTP. Transport Layer: TCP and UDP, flow control, congestion control, sliding window techniques. Network Layer: IP and routing. Data Link Layer: shared channels, media access control protocols, error detection and correction. Mobile computing and wireless networks. Network security. Laboratory consists of projects on software development of network protocols and applications. Prerequisite: A grade of C- or better in either COEN 12 or CSCI 61.   Recommended co-requisite: AMTH 108. Co-requisite: 146L
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse063793" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>146L : Computer Networks Lab</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse063793" class="collapse" role="tabpanel" style="">
			<p>LaboraLaboratory for COEN 146. Co-requisite: COEN 146.  COEN 146.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse010861" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>148 : Computer Graphics System</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse010861" class="collapse" role="tabpanel" style="">
			<p>Interactive graphic systems. Graphics primitives, line and shape generation. Simple transforming and modeling. Efficiency analysis and modular design. Interactive input techniques. Three-dimensional transformations and viewing, hidden surface removal. Color graphics, animation, real-time display considerations. Parametric surface definition and introduction to shaded-surface algorithms. Offered in alternate years. Prerequisites: MATH 53; a grade a C- or better in either COEN 12 or CSCI 61. Co-requisite: COEN 148L.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse061957" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>150 : Introduction to Information Security</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse061957" class="collapse" role="tabpanel" style="">
			<p>Security principles; operating system security: process security, file system security, application program security; access control models: DAC, MAC, RBAC, ABAC; Malware: virus, Trojan, worms, rootkits, botnets, adware, spyware; network security attacks and defenses at different layers; web security: attacks on clients and servers; cryptographic basis: symmetric cryptography, public-key cryptography, cryptographic hash functions, digital signature; Application security: database security, email security, social networking security.   Prerequisites: A grade of C- or better in COEN 146.  Corequisite: COEN 150L (4 units)
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse077984" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>150L : Introduction to Information Security Laboratory</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse077984" class="collapse" role="tabpanel" style="">
			<p>Laboratory for COEN 150. Co-requisite: COEN 150 (1 unit)
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse062065" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>152 : Introduction to Computer Forensics</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse062065" class="collapse" role="tabpanel" style="">
			<p>Procedures for identification, preservation, and extraction of electronic evidence. Auditing and investigation of network and host system intrusions, analysis and documentation of information gathered, and preparation of expert testimonial evidence. Forensic tools and resources for system administrators and information system security officers. Ethics, law, policy, and standards concerning digital evidence. Prerequisites: A grade of C- or better in either COEN 12 or CSCI 61 and in COEN 20.  Co-requisite: COEN 152L.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse063822" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>160 : Object Oriented Analysis, Design, &amp; Programming</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse063822" class="collapse" role="tabpanel" style="">
			<p>Four important aspects of object-oriented application development are covered: fundamental concepts of the OO paradigm, building analysis and design models using UML, implementation using Java, and testing object-oriented systems. Prerequisite: A grade of C- or better in COEN 79. Co-requisite: COEN 160L. Co-listed with COEN 275.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse063823" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>160L : Object Oriented Analysis, Design, &amp; Programming Lab</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse063823" class="collapse" role="tabpanel" style="">
			<p>Laboratory for COEN 160; must be taken in conjunction with COEN 160.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse062779" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>161 : Web Programming I</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse062779" class="collapse" role="tabpanel" style="">
			<p>Fundamentals of World Wide Web (WWW) and the technologies that are required to develop web-based applications. Topics cover HTML5, CSS, JavaScript, PHP, MYSQL and XML. Prerequisite: A grade of C- or better in either COEN 12 or CSCI 61. Co-requisite: COEN 161L.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse063748" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>161L : Web Programming I Lab</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse063748" class="collapse" role="tabpanel" style="">
			<p>Laboratory for COEN 161; must be taken in conjunction with COEN 161.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse062801" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>162 : Web Infrastructure</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse062801" class="collapse" role="tabpanel" style="">
			<p>History and overview of World Wide Web technology.  Web protocols. Web Navigation. Web caching and load balancing. P2P, Instant Messaging, and Web Services. Web Servers, Server Farms, and Data Centers. Prerequisite: A grade of C- or better in COEN 146.  History and overview of World Wide Web technology. Web protocols. Web Navigation. Web caching and load balancing. P2P and Content Delivery Networks. Streaming technologies. Prerequisite: A grade of C- or better in COEN 146. (4 units)
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse062757" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>163 : Web Usability</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse062757" class="collapse" role="tabpanel" style="">
			<p>Principles of user-centered design. Principles of human computer interaction. Fundamental theories in cognition and human factors: information processing, perception and representation, constructivist and ecological theories, Gestalt laws of perceptual organization. Usability engineering: user research, user profiling, method for evaluating user interface, usability testing. Prototyping in user interface: process, methods of evaluating and testing. Inclusive design in user interface design: accessibility issues, compliance with section 508 of Rehabilitation Act. Prerequisite:A grade of C- or better in either COEN 12 or CSCI 61.  Co-requisite: COEN 163L.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse063794" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>163L : Web Usability Lab</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse063794" class="collapse" role="tabpanel" style="">
			<p>Laboratory for COEN 163; must be taken in conjunction with COEN 163
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse062900" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>164 : Web Programming II</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse062900" class="collapse" role="tabpanel" style="">
			<p>Advanced topics in Web Application Development; Development with Web Frameworks, implement Web services and management of Web security. Co-requisite: COEN 164L.Prerequisite: A grade of C- or better in COEN 161 or demonstrated knowledge of Web development technology covered in COEN 161. Co-requisite: COEN 164L.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse063795" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>164L : Web Programming II Lab</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse063795" class="collapse" role="tabpanel" style="">
			<p>Laboratory for COEN 164. Co-requisite: COEN 164.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse062802" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>165 : Intro: 3D Animation &amp; Modeling</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse062802" class="collapse" role="tabpanel" style="">
			<p>Mathematical and physical principles of motion of rigid bodies, including movement, acceleration, inertia and collision. Modeling of rigid body dynamics for three-dimensional graphic simulation; controlling the motion of rigid bodies in robotic applications. Also listed as ARTS 173. May be repeated twice for credit.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse062803" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>166 : Artificial Intelligence</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse062803" class="collapse" role="tabpanel" style="">
			<p>Philosophical foundations of artificial intelligence, problem solving, knowledge and reasoning, neural networks, and other learning methods. Prerequisites: A grade of C or better in either COEN 12 or CSCI 61 and in either COEN 19 or MATH 51. Co-requisite: COEN 166L
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse065507" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>166L : Artificial Intelligence Laboratory</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse065507" class="collapse" role="tabpanel" style="">
			<p>Laboratory for COEN 166.  Co-requisite: COEN 166
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse064659" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>169 : Web Information Management</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse064659" class="collapse" role="tabpanel" style="">
			<p>Theory, design, and implementation of information systems that process, organize, analyze large-scale information on the Web. Search engine technology, recommender systems, cloud computing, social network analysis. Prerequisite: AMTH 108 or MATH 122; COEN 12 or CSCI 61; or permission of the instructor.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse010863" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>171 : Principles of Design and Implementation of Programming Languages</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse010863" class="collapse" role="tabpanel" style="">
			<p>High-level programming-language concepts and constructs. Costs of use and implementation of the constructs. Issues and trade-offs in the design and implementation of programming languages. Critical look at several modern high-level programming languages.  Prerequisites: A grade of C- or better in either COEN 12 or CSCI 61.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse010868" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>174 : Software Engineering</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse010868" class="collapse" role="tabpanel" style="">
			<p>Software development life cycle. Project teams, documentation, and group dynamics. Software cost estimation. Requirements engineering and design. Data modeling, object modeling, and object-oriented analysis. Object-oriented programming and design. Software testing and quality assurance. Software maintenance. Prerequisite: A grade of C- or better in COEN 12 or CSCI 61. Co-requisite: COEN 174L and COEN 194 (or consent of instructor)
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse063749" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>174L : Software Engineering Lab</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse063749" class="collapse" role="tabpanel" style="">
			<p>Laboratory for COEN 174. Co-requisite: COEN 174.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse010870" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>175 : Intro to Formal Lang Thry &amp; Compiler Construction</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse010870" class="collapse" role="tabpanel" style="">
			<p>Introduction to formal language concepts: regular expressions and context-free grammars. Compiler organization and construction. Lexical analysis and implementation of scanners. Top-down and bottom-up parsing and implementation of top-down parsers. An overview of symbol table arrangement, run-time memory allocation, intermediate forms, optimization, and code generation. Prerequisite:  A grade of C- or better in COEN 20 and in COEN 79.  Co-requisite: COEN 175L.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse063798" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>175L : Intro to Formal Lang Thry &amp; Compiler Construction Lab</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse063798" class="collapse" role="tabpanel" style="">
			<p>Laboratory for COEN 175; must be taken in conjunction with COEN 175.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse010872" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>177 : Operating Systems</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse010872" class="collapse" role="tabpanel" style="">
			<p>Introduction to computer operating systems. Operating system concepts, computer organization model, storage hierarchy, operating system organization, processes management, interprocess communication and synchronization, memory management and virtual memory, I/O subsystems, and file systems. Design, implementation, and performance issues. Prerequisites: A grade of C- or better in either COEN 12 or CSCI 61 and in COEN 20. Co-requisite: COEN 177L.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse063750" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>177L : Operating Systems Lab</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse063750" class="collapse" role="tabpanel" style="">
			<p>Laboratory for COEN 177. Co-requisite: COEN 177.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse010875" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>178 : Introduction to Database Systems</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse010875" class="collapse" role="tabpanel" style="">
			<p>ER diagrams and the relational data model. Database design techniques based on integrity constraints and normalization. Database security and index structures. SQL and DDL. Transaction processing basics. Prerequisites:  A grade of C- or better in either COEN 12 or CSCI 61.  Co-requisite: COEN 178L.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse063799" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>178L : Introduction to Database Systems Lab</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse063799" class="collapse" role="tabpanel" style="">
			<p>Laboratory for COEN 178. Co-requisite: COEN 178.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse040179" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>179 : Theory of Algorithms</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse040179" class="collapse" role="tabpanel" style="">
			<p>Introduction to techniques of design and analysis of algorithms: asymptotic notations and running times of recursive algorithms; design strategies: brute-force, divide and conquer, decrease and conquer, transform and conquer, dynamic programming, greedy technique. Intractability: P and NP, approximation algorithms. Also listed as CSCI 163A. Prerequisites: MATH 51 and CSCI 61, or equivalents.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse010877" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>180 : Introduction to Information Storage</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse010877" class="collapse" role="tabpanel" style="">
			<p>Storage hierarchy. Caching. Design of memory and storage devices, with particular emphasis on magnetic disks and storage-class memories. Error detection, correction, and avoidance fundamentals. Disk arrays. Storage interfaces and buses. Network attached and distributed storage, interaction of economy and technological innovation. Also listed as ELEN 180. Prerequisites: A grade of C- or better in either COEN 12 or CSCI 61. Recommended prerequisite: COEN 20.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse010878" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>188 : Co-op Education</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse010878" class="collapse" role="tabpanel" style="">
			<p>This course is designed to prepare students for the working environment, and enable them to relate their experience in the industry to their academic program. They will then engage in practical work experience related to their academic field of study and career objectives. All students must enroll in COEN 188 before in enrolling in COEN 189. Students can take COEN 188 during the first quarter of work experience, or before an internship begins. International students who wish to start (or continue) their CPT after they have taken COEN 188 must be enrolled in COEN 189.  Prerequisites: junior status and minimum cum GPA 2.75. (1 unit)
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse010881" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>189 : Work Experience and Co-op Technical Report</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse010881" class="collapse" role="tabpanel" style="">
			<p>Credit is given for a technical report on a specific activity, such as a design or research activity, after completing a co-op work assignment. Letter grades will be based on the content and quality of the report. May be taken more than once. Prerequisites: junior status, minimum cum GPA 2.75, and approval of department co-op advisor. (2 units)
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse060255" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>191 : Peer Educator for Computer Engineering</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse060255" class="collapse" role="tabpanel" style="">
			<p>
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse063745" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>193 : Undergraduate Research</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse063745" class="collapse" role="tabpanel" style="">
			<p>Involves working on a year-long research project with one of the faculty members. Students should register three times in a row for a total of 6 units. Does not substitute for the senior project, which must have junior or senior standing and a minimum GPA of 3.0.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse010883" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>194 : Design Project I</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse010883" class="collapse" role="tabpanel" style="">
			<p>Specification of an engineering project, selected with the mutual agreement of the student and the project advisor. Complete initial design with sufficient detail to estimate the effectiveness of the project. Initial draft of the project report.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse010884" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>195 : Design Project II</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse010884" class="collapse" role="tabpanel" style="">
			<p>Continued design and construction of the project, system, or device. Initial draft of project report. Prerequisite: COEN 194.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse010885" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>196 : Design Project III</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse010885" class="collapse" role="tabpanel" style="">
			<p>Continued design and construction of the project, system, or device. Formal public presentation of results. Final report. Prerequisite: COEN 195.
			</p>
		</div>
	</div>
	<div class="accordion-item">
		<a data-toggle="collapse" data-parent="#catalogList84733" href="#collapse010887" aria-expanded="false" aria-controls="catalogList84733" class="collapsed py-3 d-flex align-items-center justify-content-between flex-nowrap">
			<h5>199 : Independent Study</h5>
			<i class="h5 chevron right ml-3"></i>
		</a>
		<div id="collapse010887" class="collapse" role="tabpanel" style="">
			<p>Special problems. By arrangement. Open to computer engineering majors only.
			</p>
		</div>
	</div></div>
*/
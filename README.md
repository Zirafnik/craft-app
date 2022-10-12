# CRAFT Method App

CRAFT App is a web application which calculates the optimal costs of department layouts according to the CRAFT method. It uses 3 inputs: 2 matrixes (D = distance and T = transport) and 1 chosen department to fix (which has to be re-selected each round). It outputs the different layout options with that particular department fixed. Each layout includes the table representation and the equations used to calculate the results. Each round the best result is highlighted and fixed to be used in further calculations. In the end you are also given the optimal solution.

## The Method

CRAFT method is used for minimizing costs in a job shop layout business. A job shop is a type of manufacturing process in which small batches of products are made and the production is allocated across several different departments. The deparments specialize in one step of the production and once their batch is finished it is transported to the next department.

There are 2 matrixes used in the calculations, D (distance) and T (transport). Distance represents the possible locations (denominated as L) of departments and the distances between them. Transport matrix represents the departments or workstations (denominated as W) and the amount of products that move between them. When doing things by hand we usually create another matrix called CT (cumulative transport), which is just the total amount of products transported between the departments both ways. The cost between 2 departments is calculated by taking their locations (for instance L1 & L2) and finding the corresponding distance in the D-matrix, and then multiplying that distance with the total amount of products transported between the departments (for instance W1 & W3). The total cost is calculated as the sum of costs between all departments.

The method itself does not always calculate the optimal solution, as the number of calculations grows with the size of the matrixes at a quadratic rate. The method avoids this problem by calculating all the possible locations for 1 department and then fixing it to the place which had the lowest cost (all other departments stay constant or switch places with the one we are checking to fix). Once 1 department is fixed it cannot move. We then repeat this for all other departments, each time having fewer places available and therefore fewer combinations to check.

The solution we get is usually considered close enough to the optimal costs. The tradeoff between taking the time to calculate the optimal layout and the 'good enough' layout through CRAFT, is usually not worth it.

What is a job shop more in depth: https://www.inc.com/encyclopedia/job-shop.html

CRAFT method more in depth: [CRAFT method theory](/theory/CRAFT-method.pdf) and http://www.ijmer.com/papers/Vol3_Issue3/AB3312681272.pdf

## Motivation

I decided to build this project, as a direct response to the assignments we were given in my Operations Management class. We were given  several different examples, some using 3x3 matrixes and some even 4x4. We were tasked with completing these in Excel and the whole process became incredibly tedious and time-consuming, especially with the bigger sized matrixes. You were forced to select the correct matrix inputs for calculations by hand, which required a lot of focus and even then was very error prone.

I started out by building just some functions which I would run in the terminal, however, I soon discovered that many of my classmates were strugling and having a difficult time with the assignments. Because of that, I decided to build it into a website and give it a user-interface for easier use. 200 students from my generation utilized the app in checking their homework solutions and in preparation for the exams. I expect to see more users utilize this app with future generations.

## Development && Improvements

This was my very first big project, which also wasn't a dedicated learning project. It was built specifically to provide a solution to a problem. I used vanilla JS, HTML and CSS. As I was still very early in my learning process, there are many things which I would do differently now. 

One most apparent irregularity is that there is only one .js file with over 950 lines of code. The code is, however, written in a ***module pattern***, which means everything is an object or wrapped in an IIFE, which returns only the variables needed in other functions. This way the global namespace is not polluted and everything is mostly tied up in local scope. Because of this it would also be very easy to split the whole code into multiple modules, as it is in a sense already separated.

Another thing to consider in the future would be making it fully responsive. Currently it is responsive only to a degree. I have, however, created a separate print.css sheet, which excludes unnecessary elements from printing.

I also added several statements which act as form validation for inputs and catch the most common errors, and then pop up an alert. I did not yet know proper error handling and form validation techniques, but still implemented them to the best of my ability as custom alerts. 

If I were to rebuild this project today, I would most likely use React as there are many repeating elements, which I feel could cleanly be implemented with React components.

There might also be some optimization opportunities with more efficient algorithms and sorting.

## Instructions
1. Choose matrix sizes
2. Add numbers into matrixes (Use 'Tab' for faster switching between inputs)
3. Choose the first workstation to fix
4. Choose any consequent workstations to fix
5. PRINT / Clear RESULTS / Clear ALL

## Features
- the ability to choose custom matrix sizes
- automatically creates a CT matrix
- automatically calculates all possible options, provides the equations & graphic representation, and chooses the best solution
- does not re-calculate same layouts
- site auto-scrolls down with solutions
- print buttons that use a separate .css sheet, avoiding unnecessary printing and colors
- 'Clear RESULTS' button, which clears only the results and keeps the matrix inputs, so you can choose different deparment fixing order
- 'Clear ALL' button, which resets everything


## Live: https://zirafnik.github.io/craft-app/

![Screenshot1](/screenshots/screenshot1.png)

![Screenshot2](/screenshots/screenshot2.png)

![Screenshot3](/screenshots/screenshot3.png)



<p align="center">Copyright 2022, David Habic. All Rights Reserved</p>
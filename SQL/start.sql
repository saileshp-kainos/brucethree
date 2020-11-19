
use brucethree;

GRANT ALL PRIVILEGES ON brucethree.* TO 'saileshp'@'%';
GRANT ALL PRIVILEGES ON brucethree.* TO 'liam'@'%';
GRANT ALL PRIVILEGES ON brucethree.* TO 'georgea'@'%';

CREATE TABLE `Employee` (
  `EmployeeID` int NOT NULL AUTO_INCREMENT,
  `EmployeeName` varchar(64) DEFAULT NULL,
  `StartingSalary` decimal(10,2) NOT NULL,
  `NINumber` char(9) DEFAULT NULL,
  `EmployeeAddress` varchar(255) DEFAULT NULL,
  `IBAN` varchar(34),
  `BIC` varchar(11),
  PRIMARY KEY (`EmployeeID`)
);

CREATE TABLE `SalesEmployee` (
  `SalesEmployeeID` int NOT NULL AUTO_INCREMENT,
  `EmployeeID` int,
  `CommissionRate` decimal(3,2) NOT NULL,
  `SalesTotal` decimal(10, 2) NOT NULL,
  PRIMARY KEY (`SalesEmployeeID`),
  FOREIGN KEY (`EmployeeID`) REFERENCES `Employee`(`EmployeeID`)
)
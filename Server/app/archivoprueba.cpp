
/*

------     PROYECTO COMPILADORES    ------
------ LUIS ALEJANDRO AJUCUM SANTOS -------
*/

using namespace std;

int var = "klasdjf";

int main(){
  
  cout<<"hOLA MUNDO "<< i << endl;

  double x = 0.0;

  x = 20.5;

  //retorno sin haber definido la variable antes es un error semantico
  return resultvar;
}

main();

double x = 0.0;

double y = 3.4;

double x = 0.0;

//minuscula son no terminales
//mayuscula son Terminales

class Calculator 
{ 

int z = 10;
//Declaracion de metoods
public:
double Calculate(double x, char oper, double y);
private:
};

//los simbolos como :: tienen mayor precedencia que un : simple

double Calculator::Calculate(double x, char oper, double y){
  //continuamos con metodos con parametros
  writeline("Estamos dentro del metodo Calculate de la clase Calculator");
  
  switch(oper)
  {
    case '+':
      return x + y;
    case '-':
      return x - y;
    case '*':
      return x * y;
    case '/':
      return x / y;
    default:
       return 0.0;
  }
  
}


switch(oper)
{
  case '+':
    return x + y;
  case '-':
    return x - y;
  case '*':
    return x * y;
  case '/':
    return x / y;
  default:
      return 0.0;

}

/* */
using namespace std;

int var = "klasdjf";

cout<<"hOLA MUNDO "<< i << endl;

int main(){
  
  //error cout is not an instruction error inside the METHOD
  cout<<"hOLA MUNDO "<< i << endl;
  writeline("Hola mundo dentro de main");

  double x = 0.0;

  x = 20.5;

  //retorno sin haber definido la variable antes es un error semantico
  return resultvar;
}

main();


//#include <iostream>

using namespace std;

int main()
{
    cout << "Calculator Console Application" << endl << endl;
    cout << "Please enter the operation to perform. Format: a+b | a-b | a*b | a/b"
        << endl;
    
    int i = 1;
    while (i <= 4)
    {
        cout << i << " ";
        if(i == 3){
          writeline("While loop i: "+i);
          cout << "while loop i: " << i << endl;
        }
        i++;              
    }

    writeline("Main executed correctly");
    return 0;
}

main();
//#pragma once
class Calculator
{
public:
    double Calculate(double x, char oper, double y);
};

double Calculator::Calculate(double x, char oper, double y)
{
    switch(oper)
    {
        case '+':
            return x + y;
        case '-':
            return x - y;
        case '*':
            return x * y;
        case '/':
            return x / y;
        default:
            return 0.0;
    }
}

//Object declaration
Calculator c;

cin >> x >> oper >> y;

int main2(){

  cin >> x >> oper >> y;
  writeline("main2 method!");
}

main2();

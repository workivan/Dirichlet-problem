#include <string>
#include <vector>
#include <cmath>
#include <cctype>
#include <iostream>

extern "C"{

//// 0 <= x,y <= 1
int N;
void get_u(std::vector<std::vector<double>> &u, char *left, char *right, char *up, char *down);
long getFunction(std::string str, std::string h);
std::vector<double> reshape(std::vector<std::vector<double>> &u);

double* calculate(int countOfSteps, char *left, char *right, char *up, char *down) {
    N = countOfSteps;
    double dm, dmax;
    double eps = 0.1;
    std::vector<std::vector<double>> l(N);
    for (int i = 0; i < N; i++) {
        l.at(i) = std::vector<double>(N);
    }
    get_u(l, left, right, up, down);
    do {// максимальное изменение значений u
        dmax = 0;
        for (int i = 1; i < N-1; i++)
            for (int j = 1; j < N-1; j++) {
                double temp = l[i][j];
                l[i][j] = 0.25 * (l[i - 1][j] + l[i + 1][j] +
                                  l[i][j - 1] + l[i][j + 1]);
                dm = fabs(l[i][j] - temp);
                if (dmax < dm) dmax = dm;
            }
    } while (dmax > eps);
    return reshape(l).data();
}

std::vector<double> reshape(std::vector<std::vector<double>> &u) {
    std::vector<double> pD (N*N);
    for (int q = 0; q < N; q++) {
        for (int t = 0; t < N; t++) {
            pD[q*N+t] = u.at(q).at(t);
        }
    }
    return pD;
}

void get_u(std::vector<std::vector<double>> &u, char *left, char *right, char *up, char *down) {
    int y = 0;
    double xValue;
    for (xValue = 0; xValue <= 1; xValue += (double) 1 / N) {
        u[0][y] = (double)getFunction(left, std::to_string(xValue));
        u[N-1][y] = (double)getFunction(right, std::to_string(xValue));
        if (y != 0 && y != N) {
            u[y][0] = (double)getFunction(down, std::to_string(xValue));
            u[y][N-1] = (double)getFunction(up, std::to_string(xValue));
        }
        y++;
    }
}

//в этой функции рассмотрим все возможные операции, что могут встретиться в строке
bool operation(char c){
    return c=='+' || c=='-' || c=='*' ||  c=='/' || c=='^';
}

//данная функция будет возвращать приоритет поступившей операции
int prioritet(char op){
    if(op<0) return 3;
    else{
        if(op == '+' || op == '-')return 1;
        else if(op == '*' || op == '/' )return 2;
        else if(op == '^')return 4;
        else return -1;
    }
}

//следующая функция описывает принцип работы каждого оператора
void action(std::vector<long double> &value, char op){
    if(op<0){                            //для унарных операций
        long unitar = value.back();
        value.pop_back();
        if(-op=='-')value.push_back(-unitar);
    }
    else{                               //для бинарных операций
        long double right = value.back();
        value.pop_back();
        long double left = value.back();
        value.pop_back();
        if(op=='+')value.push_back(left+right);
        else if(op=='-')value.push_back(left-right);
        else if(op=='*')value.push_back(left*right);
        else if(op=='/')value.push_back(left/right);
        else if(op=='^')value.push_back(pow(left,right));
    }
}

long calculus(std::string &formula){
    bool unary=true;        //создадим булевскую переменную, для распределения операторов на унарные и бинарные
    std::vector<long double>value;        //заведем массив для целых чисел
    std::vector<char>op;           //и соответственно для самых операторов
    for(int i=0; i<formula.size(); i++){
        if(formula[i]=='('){    //если текущий элемент — открывающая скобка, то положим её в стек
            op.push_back('(');
            unary=true;
        }
        else if(formula[i]==')'){
            while(op.back()!='('){  //если закрывающая скобка - выполняем все операции, находящиеся внутри этой скобки
                action(value, op.back());
                op.pop_back();
            }
            op.pop_back();
            unary=false;
        }
        else if(operation(formula[i])){ //если данный элемент строки является одни из выше перечисленных операндов,то
            char zn=formula[i];
            if(unary==true)zn=-zn; //придает отрицательное значение, для распознавания функции унарности оператора
            while(!op.empty() && prioritet(op.back())>=prioritet(zn)){
                action(value, op.back());   //выполняем сами алгебраические вычисления, где все уже операции упорядочены
                op.pop_back();              //в одном из стеков по строгому убыванию приоритета, если двигаться от вершины
            }
            op.push_back(zn);
            unary=true;
        }
        else{
            unary=false;
            std::string number;      //заведем строку для найденных числовых операндов
            while(i<formula.size() && (isdigit(formula[i]) || formula[i] == '.'))number+=formula[i++];//распознаем их с помощью библиотечной функции строк
            i--;
            value.push_back(std::stod(number));//поместим в наш стек с числовыми выражениями
        }
    }
    while(!op.empty()){     //выполним еще не использованные операции в стеке
        action(value, op.back());
        op.pop_back();
    }
    return value.back(); //получим на выходе значение выражения
}

long getFunction(std::string str, std::string h) {
    std::string formula = str,x = h; //введем две строки: сам многочлен/числовое выражение и по необходимости значение переменной
    if(x[0]=='-'){  //для слаженной работы унитарного минуса при отрицательном значении переменной, заключим его в скобки
        x.insert(x.begin(),'(');
        x.insert(x.end(),')');
    }
    int size=2*formula.size();  //зададим максимальный размер строки с учетом замены переменной
    for(int i=0; i < size; i++){
        if(formula[i]=='x'){
            formula.erase(i,1);
            x.erase(x.begin() + 5, x.end());
            formula.insert(i,x);//проведем замену
        }
    }
    return calculus(formula);  //выведем ответ
}
}

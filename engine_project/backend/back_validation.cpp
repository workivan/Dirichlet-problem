#include <cstring>

extern "C" {
int number_steps_validation(int number_steps){
    if(number_steps > 0){
      return 0;
    };
    return 1;
}

int function_validation(char* t){
    int countQuoters = 0;
    bool equalExist = false;
    for(int i=0; i < std::strlen(t);i++){
        if( t[i]=='(' || t[i]==')') countQuoters++;
        if( t[i]=='=') equalExist = true;
    }
    if(countQuoters % 2 != 0){
        return 0;
    }
    if(equalExist){
        return 0;
    }
    return 1;
}
}

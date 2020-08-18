import ctypes
import os
from numpy.ctypeslib import ndpointer

lib = ctypes.cdll.LoadLibrary(os.path.abspath(
    os.path.join(os.path.dirname(__file__), "./backend/algorithm.so")))


def create_result(data):
    lib.calculate.restype = ndpointer(dtype=ctypes.c_double, shape=(data.get("number_steps") *
                                                                    data.get("number_steps"),))
    lib.calculate.argtypes = [ctypes.c_int, ctypes.c_char_p, ctypes.c_char_p, ctypes.c_char_p, ctypes.c_char_p]
    value = lib.calculate(data.get("number_steps"),
                          data.get("left_function").encode('utf-8'),
                          data.get("up_function").encode('utf-8'),
                          data.get("right_function").encode('utf-8'),
                          data.get("down_function").encode('utf-8'))
    return value


def swap_data(decision_id):
    pass
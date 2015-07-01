from checkio_referee import RefereeBase, validators, covercodes, representations, ENV_NAME

import settings_env
from tests import TESTS


class Referee(RefereeBase):
    TESTS = TESTS
    ENVIRONMENTS = settings_env.ENVIRONMENTS
    DEFAULT_FUNCTION_NAME = "hamming"
    ENV_COVERCODE = {
        ENV_NAME.PYTHON: covercodes.py_unwrap_args,
        ENV_NAME.JS_NODE: covercodes.py_unwrap_args
    }
    CALLED_REPRESENTATIONS = {
        ENV_NAME.PYTHON: representations.unwrap_arg_representation,
        ENV_NAME.JS_NODE: representations.unwrap_arg_representation,
    }

import React from 'react'
import {
    get,
} from 'lodash'
import {
    User,
    Users,
    BabyCarriage
} from '../../../ui/Icons'
import { TextInput } from '../../../ui'

const DemographicForm = ({
    errors,
    setFieldValue,
    values,
    loading
}) => (
        <React.Fragment>
            <div className="row my-4">
                <div className="col">
                    <TextInput
                        label="First Name"
                        value={get(values, 'firstName', '')}
                        onChange={(e) => setFieldValue('firstName', get(e, 'target.value', ''))}
                        icon={User}
                        disabled={loading}
                    />
                </div>
            </div>
            <div className="row my-4">
                <div className="col">
                    <TextInput
                        label="Last Name"
                        value={get(values, 'lastName', '')}
                        onChange={(e) => setFieldValue('lastName', get(e, 'target.value', ''))}
                        icon={User}
                        disabled={loading}
                    />
                </div>
            </div>
            <div className="row my-4">
                <div className="col">
                    <TextInput
                        label="Number of Adults Attending"
                        value={get(values, 'adults', 1)}
                        onChange={(e) => setFieldValue('adults', get(e, 'target.value', ''))}
                        icon={Users}
                        type="number"
                        min="1"
                        disabled={loading}
                    />
                </div>
            </div>
            <div className="row my-4">
                <div className="col">
                    <TextInput
                        label="Number of Children Attending"
                        // value={get(values, 'children', 0)}
                        //TEMPORARY FIX FOR STRING ERROR
                        value={'0'}
                        onChange={(e) => setFieldValue('children', get(e, 'target.value', ''))}
                        icon={BabyCarriage}
                        type="number"
                        min="0"
                        disabled={loading}
                    />
                </div>
            </div>
        </React.Fragment>
    )

export default DemographicForm
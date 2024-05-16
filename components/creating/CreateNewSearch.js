'use client';

import styled from "@emotion/styled";
import {FlexBox, Gap} from "@/components/common";
import {useForm} from "@mantine/form";
import {Button, Drawer, NumberInput, Select, TextInput} from "@mantine/core";
import CustomMap from "@/components/core/Map";
import APIClient from '@/services/api'
import {useDisclosure} from "@mantine/hooks";
import {useState} from "react";
import { DateTimePicker } from '@mantine/dates';
import {theme} from "@/styles/themes";
import {CheckIcon, Clock, Home, Locate, Milestone, X} from "lucide-react";
import {notifications} from "@mantine/notifications";
import Autocomplete, {usePlacesWidget} from "react-google-autocomplete";


const isTesting = true;

function CreateNewSearch(props) {
    const [opened, { open, close }] = useDisclosure(false);
    const { ref: originationInputRef } = usePlacesWidget({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        options: {
            types: ['address']
        },
        onPlaceSelected: (place) => form.setFieldValue('origination', place.formatted_address)

    })
    const { ref: destinationInputRef } = usePlacesWidget({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        options: {
            types: ['address']
        },
        onPlaceSelected: (place) => form.setFieldValue('destination', place.formatted_address)
    })
    const [searchData, setSearchData] = useState(null)
    const form =useForm({
        mode: 'uncontrolled',
        initialValues: {
            origination: '',
            destination: '',
            mode: 'Driving'
        },
        validate: {
            origination: (value) => value  ? null : 'Origination cannot be empty',
            destination: (value) => value  ? null : 'Destination cannot be empty',


        }

    })
    // const { isLoaded } = useLoadScript({
    //     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    // });

    function convertAndTruncateDistance(distanceText) {
        // Convert the distance text to a number
        const distanceInKm = parseFloat(distanceText);

        // Convert kilometers to miles
        const distanceInMiles = distanceInKm * 0.621371;

        // Truncate to 2 decimal places
        const truncatedDistance = distanceInMiles.toFixed(2);

        return truncatedDistance;
    }


    const handleSubmit = async (values, e) => {
        e.preventDefault();
        console.log(e)
        console.log(values, 2)
        const id = notifications.show({
            loading: true,
            title: 'Loading your data',
            message: 'Data will be loaded in 3 seconds, you cannot close this yet',
            autoClose: false,
            withCloseButton: false,
        });



        return APIClient.api.post(`/distance`, values).then(data => {
            notifications.update({
                id,
                color: 'teal',
                title: 'Success',
                message: 'Search success',
                icon: <CheckIcon  />,
                loading: false,
                autoClose: 3000,
            });
            setSearchData(data)
            open();
        }).catch(e => {
            notifications.update({
                id,
                color: 'red',
                title: 'Error',
                message: e.message || 'Something went wrong  :(',
                icon: <X  />,
                loading: false,
                autoClose: 4000,
            });
        })
    }

    const handleSchedule = async (values) => {
        console.log(values, 2)
        const id = notifications.show({
            loading: true,
            title: 'Sit tight!',
            message: 'We are scheduling your monitoring job. This may take a few seconds.',
            autoClose: false,
            withCloseButton: false,
        });



        return APIClient.api.post(`/distance/schedule`, values).then(data => {
            notifications.update({
                id,
                color: 'teal',
                title: 'Success',
                message: 'Monitoring job scheduled successfully',
                icon: <CheckIcon  />,
                loading: false,
                autoClose: 2000,
            });
        }).catch(e => {
          console.log(e.message || 'Something went wrong')
            notifications.update({
                id,
                color: 'red',
                title: 'Error',
                message: e.message || 'Something went wrong  :(',
                icon: <X  />,
                loading: false,
                autoClose: 2000,
            });
        })
    }
    return (
        <Container wrap={'wrap'}>
           <FormContainer>
               <form onSubmit={form.onSubmit(handleSubmit)}>
                   {/*<Autocomplete*/}
                   {/*    options={{*/}
                   {/*types: ['address']}*/}
                   {/*    }*/}
                   {/*    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}*/}
                   {/*    onPlaceSelected={(place) => console.log(place)}*/}
                   {/*/>*/}
                   <TextInput
                       ref={originationInputRef}
                       withAsterisk

                       label={'Starting Address'}
                       placeholder={'123 Apple street'}
                       key={form.key('origination')}
                       {...form.getInputProps('origination')}
                       />
                   <TextInput
                       withAsterisk
                       ref={destinationInputRef}
                       label={'Destination Address'}
                       placeholder={'123 Apple street'}
                       key={form.key('destination')}
                       {...form.getInputProps('destination')}
                   />
                   <Select
                       label="Travel Mode"
                       placeholder="Pick value"
                       defaultValue={'Driving'}
                       data={['Walking',  'Driving', 'Biking']}
                       key={form.key('mode')}
                       {...form.getInputProps('mode')}
                       searchable
                       nothingFoundMessage="Nothing found..."
                   />
                   <Gap gap={24}/>
                   <Button type="submit">Submit</Button>
               </form>
           </FormContainer>

            <MapContainer isTesting={isTesting}>

              {/*<CustomMap/>*/}
            </MapContainer>
            { !!opened && (
                <StyledDrawer
                    closeOnClickOutside={false}
                    closeOnEscape={false}
                    size={700} offset={8} radius="lg" opened={opened} onClose={close} title="Set Up">
                    <FlexBox gap={8}>
                        <ResultItem align={'center'} direction={'column'}>

                                <Home/>
                                <div className={'result-item-value'}>{searchData?.origination.split(',')[0]}</div>


                        </ResultItem>
                        <ResultItem align={'center'} direction={'column'}>

                                <Locate/>
                                <div className={'result-item-value'}>{searchData?.destination.split(',')[0]}</div>


                        </ResultItem>
                        <ResultItem align={'center'} direction={'column'}>

                            <Clock/>
                            <div className={'result-item-value'}>{searchData?.durationInTraffic}</div>


                        </ResultItem>
                        <ResultItem align={'center'} direction={'column'}>

                            <Milestone/>
                            <div className={'result-item-value'}>{convertAndTruncateDistance(searchData?.distance)} miles</div>


                        </ResultItem>
                    </FlexBox>


                    <Gap gap={24}/>
                    <form onSubmit={form.onSubmit(handleSchedule)}>
                        <DateTimePicker   key={form.key('start')}

                                          dropdownType="modal"
                                          defaultValue={new Date()}

                                          valueFormat="M/D/YYYY hh:mm A"

                                          description={<div> By default, we will start monitoring this route <span style={{fontWeight: 700}}> immediately </span>. If you would like to specify a date time, do so here </div>}
                                          {...form.getInputProps('start')} label="Starting Date Time" placeholder="Pick date and time" />

                        <Gap gap={12}/>

                        <DateTimePicker   key={form.key('end')}
                                          dropdownType="modal"
                                          valueFormat="M/D/YYYY hh:mm A"

                                          description={<div> We monitor the route for up to <span style={{fontWeight: 700}}> 18 hours < /span>. If you need a a longer monitoring job, we recommend scheduling another once the first one has finished </div>}
                                          {...form.getInputProps('end')}  label="Ending Date Time" placeholder="Pick date and time" />
                        <Gap gap={12}/>
                        <Select
                            label="Frequency"
                            description={<div> By default we check every <span style={{fontWeight: 700}}> 5 minutes </span>. Paid users have the option to get checks every minute for more accurate results </div>}

                            placeholder="Every 5 minutes"
                            // disabled
                            data={[
                                { value: '1', label: 'Every minute' },
                                { value: '5', label: 'Every 5 minutes' },
                                { value: '10', label: 'Every 10 minutes' },
                                { value: '30', label: 'Every 30 minutes' },
                                { value: '60', label: 'Every hour' },
                            ]}
                            // defaultValue={'5'}

                            key={form.key('frequency')}
                            {...form.getInputProps('frequency')}
                            searchable
                            nothingFoundMessage="Not an option..."
                        />
                        <Gap gap={12}/>
                        <NumberInput label="Trigger Duration ( in minutes )"
                                     key={form.key('targetMinutes')}
                                     {...form.getInputProps('targetMinutes')}
                                     description={<div> when the travel time is <span style={{fontWeight: 700}}>equal to or less</span> than this duration, we will send a notification</div>}
                                     placeholder="30 minutes" hideControls />


                        <Gap gap={24}/>
                        <Button type={'submit'}>
                            Schedule Monitoring
                        </Button>
                    </form>

                </StyledDrawer>
            )}
        </Container>
    );
}

export default CreateNewSearch;

const Container = styled(FlexBox)`
  width: 100%;
  height: 100vh;
  padding: 24px;
  .mantine-Button-root {
    background-color: ${theme.secondaryOrange};
    width: 150px;
    //font-size: 16px;
    font-weight: 700;
    //padding: 12px 24px;
  }
  .mantine-Button-root:hover {
    cursor: pointer;
    background-color: ${theme.primaryOrange};
  }

  .mantine-Input-input  {
    border: 2px solid;
    border-color: ${theme.secondaryOrange};
  }


  //height: 100vh;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }

`

const ResultItem = styled(FlexBox)`
  border: 1px solid ${theme.lightOrange};
  padding: 12px 12px;
  text-align: center;
  border-radius: 4px;
  max-width: 155px;

  .result-item-value {
    font-size: 12px;
    max-width: 155px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

  }

  // background-color: ${theme.fadedOrange};
`
const StyledDrawer = styled(Drawer)`
  .mantine-Drawer-content {
    padding: 12px;
  }
  .search-query {
    margin-bottom: 12px;
  }
  .result-data-label {
    font-size: 18px;
    font-weight: 700;
    margin-top: 12px;
  }
`

const FormContainer = styled.div`
  //width: 30%;
  //min-width: 300px;
  flex:1; /* Prevents the form container from shrinking */
  padding: 12px;
  height: 100%;
`
const MapContainer = styled.div`
  //width: 70%;
  //padding: 12px;

  background-color: ${props => props?.isTesting && 'grey'};
  height: 100%;
  flex:3; /* Allows the map container to shrink */


  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`

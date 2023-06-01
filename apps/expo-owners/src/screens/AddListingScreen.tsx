import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { PropertyList } from "../components/NativeBase/Selector";
import { SelectDropdown } from "../components/NativeBase/SelectDropdown";
import { RadioControlled } from "../components/NativeBase/RadioControlled";
import { Input } from "native-base";
import { trpc } from "../utils/trpc";
import { useState, useEffect } from "react";
import { Button } from "react-native";
//type FormData = {};

//TODO
//render property objects
//input propertyID
//jobtype
//contractorType
//reacurring
//ready to hire
//budget
//title
//desc

export const AddListingScreen = () => {
  const utils = trpc.useContext();
  const { mutate, isLoading, isError, error, data } =
    trpc.list.create.useMutation({
      async onSuccess() {
        await utils.list.all.invalidate();
      },
    });
  const [propertyID, setPropertyID] = useState("");
  const [jobType, setJobType] = useState("");
  const [contractorType, setContractorType] = useState("");
  const [budget, setBudget] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [readyToHire, setReadyToHire] = useState(false);

  const { data: properties } = trpc.property.all.useQuery();

  const propertyOptions =
    properties?.map((Property) => ({
      label: Property.Address,
      value: Property.id,
    })) || [];

  const handleSubmit = () => {
    console.log({
      propertyId: propertyID,
      jobType,
      contractorType,
      readyToHire: true, // replace with actual state variable
      budget,
      title,
      description,
    });

    mutate({
      propertyId: propertyID,
      jobType,
      contractorType,
      readyToHire: true, // replace with actual state variable
      budget,
      title,
      description,
    });

    setPropertyID("");
    setJobType("");
    setContractorType("");
    setBudget(0);
    setTitle("");
    setDescription("");
  };

  return (
    <SafeAreaView className="bg-gray">
      <ScrollView>
        <View>
          <Text>Pick Property: </Text>
          <SelectDropdown
            selectedValue={propertyID}
            onValueChange={setPropertyID}
            options={propertyOptions}
            Placeholder="Selct a property"
          />
        </View>
        <View>
          <Text>Job Type: </Text>
          <SelectDropdown
            selectedValue={jobType}
            onValueChange={setJobType}
            Change={(value) => setService(value)}
            options={[{ label: "Cleaning", value: "Cleaning" }]}
          />
        </View>
        <Text>Contractor Type: </Text>
        <SelectDropdown
          selectedValue={contractorType}
          onValueChange={setContractorType}
          options={[{ label: "Independent", value: "independent" }]}
        />
        <View>
          <Text>Ready to Hire?</Text>
          <RadioControlled
            selectedValue={readyToHire}
            onValueChange={setReadyToHire}
          />
        </View>
        <View>
          <Text>budget</Text>
          <Input
            value={budget}
            onValueChange={setBudget}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text>Title</Text>
          <Input value={title} onChangeText={setTitle} />
        </View>
        <View>
          <Text>Description</Text>
          <Input value={description} onChangeText={setDescription} />
        </View>
        <Button title="Submit" onPress={handleSubmit} />
        {isLoading && <Text>Submitting...</Text>}
        {isError && <Text>Error: {error.message}</Text>}
        {data && <Text>Successfully submitted!</Text>}
      </ScrollView>
    </SafeAreaView>
  );
};
